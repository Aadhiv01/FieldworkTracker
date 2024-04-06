import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DashboardmaintosecondService } from '../dashboardmaintosecond.service';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUserType } from '../state/auth.selectors';

type HoursType = {
  independent: any[]; // You can replace 'any' with the specific type you expect for independent hours
  supervised: any[]; // You can replace 'any' with the specific type you expect for supervised hours
};

@Component({
  selector: 'app-dashboardmain',
  templateUrl: './dashboardmain.component.html',
  styleUrls: ['./dashboardmain.component.scss']
})
export class DashboardmainComponent implements OnInit {

  userType$: string = 'Initial';
  supervisors: { id: number, firstName: string, lastName: string, email:string, qualification: string, userEmail: string }[] = [];
  organizations: { id: number, name: string, userEmail: string }[] = [];
  selectedSupervisor: any = "+ Add New Supervisor";
  selectedOrganization: any = "+ Add New Organization";
  hoursData: HoursType = { 'independent': [], 'supervised': [] };
  currentDate: Date = new Date();
  totalHoursSum: number = 0;
  months: any[] = [];

  constructor(private router: Router, private store: Store, private dataservice: DataService, private cdr: ChangeDetectorRef, private dashboardmaintosecondService: DashboardmaintosecondService) {}

  ngOnInit(): void {

    this.store.select(selectUserType).subscribe(userType => {
      this.userType$ = userType;
    });
    this.getSupervisorsOrganizations();
    this.cdr.detectChanges();
    console.log("User Type Dashboard:", this.userType$);
  }
  getSupervisorsOrganizations() {
    const supervisorsObservable = this.dataservice.getSupervisors();
    const organizationsObservable = this.dataservice.getOrganizations();

    forkJoin([supervisorsObservable, organizationsObservable]).subscribe(
      ([supervisorsData, organizationsData]) => {

        console.log("Fetched supervisors: ", supervisorsData.data);
        this.supervisors = supervisorsData.data;
        this.selectedSupervisor = this.supervisors[0] ?? "+ Add New Supervisor";
        console.log("Fetched supervisors' length: ", this.supervisors.length, this.selectedSupervisor);

        console.log("Fetched organizations: ", organizationsData.data);
        this.organizations = organizationsData.data;
        this.selectedOrganization = this.organizations[0] ?? "+ Add New Organization";
        console.log("Fetched organizations' length: ", this.organizations.length, this.selectedOrganization);

        if (this.selectedSupervisor != "+ Add New Supervisor" && this.selectedOrganization != "+ Add New Organization") {
          this.executeMethod();
          this.getHoursData();
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log("Changes:", changes['selectedSupervisor'], changes['selectedOrganization']);
  //   if (changes['selectedSupervisor'] && !changes['selectedSupervisor'].firstChange && changes['selectedOrganization'] && !changes['selectedOrganization'].firstChange) {
  //     this.executeMethod();
  //   }
  // }

  executeMethod() {
    console.log("Selected Supervisor:", this.selectedSupervisor, "Selected Organization:", this.selectedOrganization);
    this.dashboardmaintosecondService.changeMessage(this.selectedSupervisor["firstName"] + " " + this.selectedSupervisor["lastName"], this.selectedOrganization["name"]);
  }

  async getSupervisors() {
    await this.dataservice.getSupervisors().subscribe(
      (data) => {
        console.log("Fetched supervisors: ", data.data);
        this.supervisors = data.data;
        this.selectedSupervisor = this.supervisors[0] ?? "+ Add New Supervisor";
        console.log("Fetched supervisors' length: ", this.supervisors.length, this.selectedSupervisor);
      },
      (error) => {
        console.error('Error fetching supervisors:', error);
      }
    )
  }

  async getOrganizations() {
    await this.dataservice.getOrganizations().subscribe(
      (data) => {
        console.log("Fetched organizations: ", data.data);
        this.organizations = data.data;
        this.selectedOrganization = this.organizations[0] ?? "+ Add New Organization";
        console.log("Fetched organizations' length: ", this.organizations.length, this.selectedOrganization);
      },
      (error) => {
        console.error('Error fetching organizations:', error);
      }
    )
  }

  getHoursData() {
    var independentHours = {};
    this.dataservice.getHours("independent").subscribe(
      (data) => {
        console.log("Fetched i hours: ", data.data);
        this.hoursData.independent = data.data;
        console.log("IH:", this.hoursData.independent);
        this.totalHoursSum += this.totalSum('independent');
        this.getMonths()
      },
      (error) => {
        console.error('Error fetching i hours:', error);
      }
    );
    var supervisedHours = {};
    this.dataservice.getHours("supervised").subscribe(
      (data) => {
        console.log("Fetched s hours: ", data.data);
        this.hoursData.supervised = data.data;
        console.log("SH: ", this.hoursData.supervised);
        this.totalHoursSum += this.totalSum('supervised');
        this.getMonths()
      },
      (error) => {
        console.error('Error fetching s hours:', error);
      }
    );
;  }

  totalSum(attribute: string) {
    if(attribute == "independent")
      return this.hoursData.independent.filter(h => new Date(h.date).getMonth() == new Date().getMonth()).reduce((total, val) => total + val.restricted + val.unrestricted, 0);
    else if(attribute == "supervised")
      return this.hoursData.supervised.filter(h => new Date(h.date).getMonth() == new Date().getMonth()).reduce((total, val) => total + val.individualRestricted + val.individualUnrestricted + val.groupUnrestricted, 0);
    else if(attribute == "groupsupervised")
      return this.hoursData.supervised.filter(h => new Date(h.date).getMonth() == new Date().getMonth()).reduce((total, val) => total + val.groupUnrestricted, 0)
  }

  getMonths() {
    this.hoursData.independent.forEach(h => {
      const tempDateString = `${new Date(h.date).toLocaleString('default', { month: 'long' })} ${new Date(h.date).getFullYear()}`
      console.log("I-TD:", tempDateString);
      if(!this.months.includes(tempDateString)){
        this.months.push(tempDateString);
      }
    });
    this.hoursData.supervised.forEach(h => {
      const tempDateString = `${new Date(h.date).toLocaleString('default', { month: 'long' })} ${new Date(h.date).getFullYear()}`
      console.log("S-TD:", tempDateString);
      if(!this.months.includes(tempDateString)){
        this.months.push(tempDateString);
      }
    });
    this.months.sort((a,b) => new Date(b).getTime() - new Date(a).getTime());
    console.log("Months updated:", this.months);
    this.cdr.detectChanges();
  }

  getSupervisorsLength() {
    return this.hoursData.supervised.filter(h => new Date(h.date).getMonth() == new Date().getMonth()).length;
  }

  checkObservations() {
    console.log("Observarions Check:", this.hoursData.supervised.filter(h => new Date(h.date).getMonth() == new Date().getMonth()), this.hoursData.supervised.filter(h => new Date(h.date).getMonth() == new Date().getMonth()).filter(r => r.contactType == 'Observation').length);
    return this.hoursData.supervised.filter(h => new Date(h.date).getMonth() == new Date().getMonth()).filter(r => r.contactType == 'Observation').length > 0;
  }

  onSelectChange(value: any): void {
    console.log('Selected value changed:', value, this.selectedSupervisor, this.selectedOrganization, typeof(value));
    if(this.selectedSupervisor && this.selectedOrganization && this.selectedSupervisor !== '+ Add New Supervisor' && this.selectedOrganization !== '+ Add New Organization') {
      this.executeMethod();
      this.getHoursData();
    }
  }

  buttonRedirect(componentName: string, dateString?: string | null) {
    console.log("Params Nav:", this.selectedSupervisor, JSON.stringify(this.selectedSupervisor));
    this.router.navigate([componentName], { state: { date: dateString ? new Date(dateString) : dateString, organization: this.selectedOrganization.name, supervisor: JSON.stringify(this.selectedSupervisor), months: this.getMonths() } });
  }
}
