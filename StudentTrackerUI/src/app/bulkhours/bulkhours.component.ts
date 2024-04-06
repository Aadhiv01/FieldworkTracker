import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../state/auth.actions';

@Component({
  selector: 'app-bulkhours',
  templateUrl: './bulkhours.component.html',
  styleUrls: ['./bulkhours.component.scss']
})
export class BulkhoursComponent implements OnInit {

  supervisors: { id: number, firstName: string, lastName: string, email:string, qualification: string, userEmail: string }[] = [];
  organizations: { id: number, name: string, userEmail: string }[] = [];
  selectedSupervisor: any = "+ Add New Supervisor";
  selectedOrganization: any = "+ Add New Organization";
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  years: number[] = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017];
  available_months: string[] = [];
  selectedMonth: string = "";
  selectedYear: number = 0;
  fieldworkType: string = "";
  buttonSelect: string = "";
  date: Date = new Date();
  dateVal: string | null = "";
  startTime: string = "00:00:00";
  endTime: string = "00:00:00";
  isIndependent: boolean = true;
  isSupervised: boolean = false;
  contact_type: string = "";
  format_type: string = "";
  timeDifference: number = -1;
  tempTimeDifference: number = -1;
  restrictedHours: number = 0;
  unrestrictedHours: number = 0;
  individualRestricted: number = 0;
  individualUnrestricted: number = 0;
  groupUnrestricted: number = 0;
  nonObservationalContacts: number = 0;
  observationalContacts: number = 0;
  description: string = "";

  constructor(private route: Router, private store: Store, private dataservice: DataService) {}

  ngOnInit(): void {
    this.getSupervisors();
    this.getOrganizations();
    this.available_months = history.state.months;
  }

  getSupervisors() {
    this.dataservice.getSupervisors().subscribe(
      (data) => {
        console.log("Fetched supervisors: ", data.data);
        this.supervisors = data.data;
        console.log("Fetched supervisors' length: ", this.supervisors.length);
      },
      (error) => {
        console.error('Error fetching supervisors:', error);
      }
    )
  }

  getOrganizations() {
    this.dataservice.getOrganizations().subscribe(
      (data) => {
        console.log("Fetched organizations: ", data.data);
        this.organizations = data.data;
        console.log("Fetched organizations' length: ", this.organizations.length);
      },
      (error) => {
        console.error('Error fetching organizations:', error);
      }
    )
  }

  saveHours(hoursform: NgForm) {
    const dateString = this.selectedMonth && this.selectedYear ? this.selectedMonth + ' ' + this.selectedYear : '';
    if (dateString) {
      this.date = new Date(dateString);
      console.log(this.date, new Date(dateString), new Date(this.selectedYear, this.months.indexOf(this.selectedMonth)));
    } else {
      console.error('Invalid month or year selection');
    }
    console.log("Bulk Hours add | Restricted :", this.restrictedHours, typeof(this.restrictedHours), "Unrestricted :", this.unrestrictedHours, "Restricted :", this.individualRestricted, "Individual Unrestricted :", this.individualUnrestricted, "Group Unrestricted :", this.groupUnrestricted, "Contact Type :", this.contact_type, "Format Type :", this.format_type, "Description :", this.description, "Date :", this.date, "Supervisor:", this.selectedSupervisor["firstName"] + " " + this.selectedSupervisor["lastName"], "Supervisor Email:", this.selectedSupervisor["email"]);
    console.log("Available months:", this.available_months, "isMonthPresent:", this.available_months.filter(m => new Date(m).getTime() == this.date.getTime()).length)
    if(this.available_months.filter(m => new Date(m).getTime() == this.date.getTime()).length == 0) {
      alert("Hours Saved!")
      this.store.dispatch(AuthActions.addHours({ data: { UserEmail: JSON.parse(sessionStorage.getItem('user')!).email, Date: new Date(this.selectedYear, this.months.indexOf(this.selectedMonth)), StartTime: this.startTime, EndTime: this.endTime, Supervisor: this.selectedSupervisor["firstName"] + " " + this.selectedSupervisor["lastName"], SupervisorEmail: this.selectedSupervisor["email"], Organization: this.selectedOrganization["name"], Restricted: this.restrictedHours, Unrestricted: this.unrestrictedHours, IndividualRestricted: this.individualRestricted, IndividualUnrestricted: this.individualUnrestricted, GroupUnrestricted: this.groupUnrestricted, ContactType: this.contact_type, FormatType: this.format_type, Description: this.description, HoursType: "Bulk"  } }))
      this.urlRedirect("/dashboard");
    }
    else
      console.error("Existing Month!");
  }

  urlRedirect(route: string) {
    this.route.navigate([route])
    .then(() => {
      window.location.reload();
    });
  }

  buttonRedirect(componentName: string) {
    this.route.navigate([componentName]);
  }

}
