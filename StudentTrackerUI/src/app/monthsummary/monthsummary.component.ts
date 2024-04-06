import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Store } from '@ngrx/store';
import { forkJoin } from 'rxjs';

type HoursType = {
  independent: any[]; // You can replace 'any' with the specific type you expect for independent hours
  supervised: any[]; // You can replace 'any' with the specific type you expect for supervised hours
};

@Component({
  selector: 'app-monthsummary',
  templateUrl: './monthsummary.component.html',
  styleUrl: './monthsummary.component.scss'
})
export class MonthsummaryComponent implements OnInit {

  dateVal: Date = new Date();
  currentYear = new Date().getFullYear();
  selectedOrganization: string = "";
  selectedSupervisor: { firstName: string, lastName: string, bacbid: string, email: string, id: number, qualification: string, userEmail: string } = { firstName: "", lastName: "", bacbid: "", email: "", id: 0, qualification: "", userEmail: "" };
  hoursData: HoursType = { 'independent': [], 'supervised': [] };
  completeHoursData: any[] = [];
  totalHoursSum: number = 0;
  userName: string = "";
  isPrintMode = false;

  constructor(private router: ActivatedRoute, private route: Router, private dataservice: DataService, private store: Store) {}

  ngOnInit(): void {
      this.dateVal = history.state.date ? new Date(history.state.date) : new Date();
      this.selectedOrganization = history.state.organization;
      this.selectedSupervisor = JSON.parse(history.state.supervisor);
      const userDetails = JSON.parse(sessionStorage.getItem('user')!);
      this.userName = userDetails.firstName + " " + userDetails.lastName;
      console.log("Date:", history.state.date, "Organization:", history.state.supervisor, "Supervisor", JSON.parse(history.state.supervisor));

    if(this.dateVal) {
      console.log("Date Val:", this.dateVal);
      this.getHoursData();
      console.log("Combined Hours:", this.completeHoursData);
    }
  }

  getHoursData() {
    const independent$ = this.dataservice.getHours("independent", this.dateVal);
    const supervised$ = this.dataservice.getHours("supervised", this.dateVal);

    forkJoin([independent$, supervised$]).subscribe(
      ([independentData, supervisedData]) => {
        console.log('Fetched independent hours summary: ', independentData.data);
        console.log('Fetched supervised hours summary: ', supervisedData.data);

        this.hoursData.independent = independentData.data;
        this.hoursData.supervised = supervisedData.data;
        this.totalHoursSum += this.totalSum('independent') + this.totalSum('supervised');

        this.completeHoursData = [...independentData.data, ...supervisedData.data].sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : null;
          const dateB = b.date ? new Date(b.date) : null;

          const startTimeA = a.startTime ? new Date(`1970-01-01T${a.startTime}`) : null;
          const startTimeB = b.startTime ? new Date(`1970-01-01T${b.startTime}`) : null;

          if (dateA && dateB) {
            if(dateA.getTime() == dateB.getTime() && startTimeA && startTimeB) {
              return startTimeA.getTime() - startTimeB.getTime();
            } else {
              return dateB.getTime() - dateA.getTime();
            }
          } else if (dateA) {
            return 1;
          } else if (dateB) {
            return -1;
          } else{
            return 0;
          }
        });

        console.log("Completed Hours :", this.completeHoursData);

      },
      error => {
        console.error('Error fetching hours summaries:', error);
      }
    );
  }

  getTime(time: string) {
    return new Date("1970-01-01T" + time);
  }

  totalSum(attribute: string) {
    if(attribute == "independent")
      return this.hoursData.independent.reduce((total, val) => total + val.restricted + val.unrestricted, 0);
    else if(attribute == "supervised")
      return this.hoursData.supervised.reduce((total, val) => total + val.individualRestricted + val.individualUnrestricted + val.groupUnrestricted, 0);
    else if(attribute == "groupsupervised")
      return this.hoursData.supervised.reduce((total, val) => total + val.groupUnrestricted, 0)
  }

  restrictedSum() {
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.restricted || 0), 0);
  }

  unrestrictedSum() {
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.unrestricted || 0), 0);
  }

  individualRestrictedSum() {
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.individualRestricted || 0), 0);
  }

  individualUnrestrictedSum() {
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.individualUnrestricted || 0), 0);
  }

  groupUnrestrictedSum() {
    return this.completeHoursData.reduce((sum, hour) => sum + (hour.groupUnrestricted || 0), 0);
  }

  contactCount() {
    return this.completeHoursData.filter(h => h.contactType).length;
  }

  observationCount() {
    return this.completeHoursData.filter(h => h.contactType == 'Observation').length;
  }

  checkObservations() {
    return this.hoursData.supervised.filter(r => r.contactType == 'Observation').length > 0;
  }

  printPage() {
    window.print();
  }

  deleteMonth() {
    alert("Delete month entry?");
  }

  urlRedirect(route: string) {
    this.route.navigate([route])
    .then(() => {
      window.location.reload();
    });
  }

}
