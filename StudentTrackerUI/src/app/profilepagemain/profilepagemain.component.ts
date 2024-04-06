import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilepagemainService } from './services/profilepagemain.service';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../state/auth.actions';
import { selectUser, selectUserType } from '../state/auth.selectors';
import { Observable } from 'rxjs';

interface Supervisor {
  id: number,
  firstName: string,
  lastName: string,
  bacbid: string,
  qualification: string,
  userEmail: string,
  email: string
}

interface Organization {
  id: number,
  name: string,
  userEmail: string,
}

@Component({
  selector: 'app-profilepagemain',
  templateUrl: './profilepagemain.component.html',
  styleUrls: ['./profilepagemain.component.scss']
})

export class ProfilepagemainComponent implements OnInit {

  userType$: string = 'Initial';
  type: string = "";
  supervisors: any[] = [];
  organizations: any[] = [];
  qualifications: string[] = ["BCBA/BCBA-D", "Verified Instructor", "ABPP/ABA"];
  countries: any[] = [];
  supervisor_fname: string = "";
  supervisor_lname: string = "";
  supervisor_email: string = "";
  supervisor_bacbid: string = "";
  supervisor_qualification: string = "";
  organization_name: string = "";
  selected_country: string = "";
  userdata: {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: string,
    bacbid: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    school: string,
    graduationYear: number,
    currentEmployer: string,
    linkedIn: string
 } = { id: 0, firstName: "", lastName: "", email: "", password: "", userType: "", bacbid: "", phone: "", address: "", city: "", state: "", zip: "", country: "", school: "", graduationYear: 0, currentEmployer: "", linkedIn: "" };
  addSupervisorToggle: boolean = false;
  addOrganizationToggle: boolean = false;

  constructor(private router: ActivatedRoute, private route: Router, private profilepagemainService: ProfilepagemainService, private dataservice: DataService, private store: Store) {}

  ngOnInit() {
    this.store.select(selectUserType).subscribe(userType => {
      this.userType$ = userType;
    });
    this.type = this.router.snapshot.params['type'];
    this.type = this.type ? this.type : "";
    this.profilepagemainService.getCountries().subscribe(data => {
      this.countries = data;
    });
    this.dataservice.getSupervisors().subscribe(data => {
      this.supervisors = data.data;
      console.log("Supervisors fetched:", this.supervisors);
    });
    this.dataservice.getOrganizations().subscribe(data => {
      this.organizations = data.data;
      console.log("Organizations fetched:", this.organizations);
    });
    this.userdata = JSON.parse(sessionStorage.getItem('user')!);
    console.log("Loaded user data:", this.userdata);
    console.log("User Type:", this.userType$);
  }

  addSupervisor(supervisorForm: NgForm) {
    if(supervisorForm && this.supervisor_fname && this.supervisor_lname && this.supervisor_bacbid && this.supervisor_qualification ) {
      this.store.dispatch(AuthActions.addSupervisor({ data: { FirstName: this.supervisor_fname, LastName: this.supervisor_lname, email: this.supervisor_email, bacbid: this.supervisor_bacbid, qualification: this.supervisor_qualification, userEmail: JSON.parse(sessionStorage.getItem('user')!).email } }));
      window.location.reload();
    }
  }

  addSupervisorToggleClick() {
    this.addSupervisorToggle = true;
  }

  editSupervisor(supervisor: Supervisor) {
    this.addSupervisorToggle = true;
    this.supervisor_fname = supervisor.firstName;
    this.supervisor_lname = supervisor.lastName;
    this.supervisor_email = supervisor.email;
    this.supervisor_bacbid = supervisor.bacbid;
    this.supervisor_qualification = supervisor.qualification;
  }

  addOrganization(organizationForm: NgForm) {
    console.log("pfp main: ", this.organization_name);
    if(organizationForm && this.organization_name ) {
      this.store.dispatch(AuthActions.addOrganization({ data: { name: this.organization_name, userEmail: JSON.parse(sessionStorage.getItem('user')!).email } }));
      window.location.reload();
    }
  }

  addOrganizationToggleClick() {
    this.addOrganizationToggle = true;
  }

  editOrganization(organization: Organization) {
    this.addOrganizationToggle = true;
    this.organization_name = organization.name;
  }

  isActive(route: string): boolean {
    return this.route.isActive(route, true);
  }

  urlRedirect(route: string) {
    this.route.navigate([route])
    .then(() => {
      window.location.reload();
    });
  }
}
