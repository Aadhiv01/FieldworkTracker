import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DashboardmaintosecondService } from '../dashboardmaintosecond.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../state/auth.actions';

@Component({
  selector: 'app-dashboardsecond',
  templateUrl: './dashboardsecond.component.html',
  styleUrls: ['./dashboardsecond.component.scss'],
  providers: [DatePipe]
})
export class DashboardsecondComponent implements OnInit {

  @ViewChild('startMinuteInput') startMinuteInput!: ElementRef;
  @ViewChild('startAmPmInput') startAmPmInput!: ElementRef;


  selectedSupervisor: any;
  selectedOrganization: any;
  date: Date = new Date();
  dateVal: string | null = "";
  start_time_h: string = "";
  start_time_m: string = "";
  start_time_ampm: string = "";
  end_time_h: string = "";
  end_time_m: string = "";
  end_time_ampm: string = "";
  ampm: string[] = ["AM", "PM"];
  startTime: string = "";
  endTime: string = "";
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
  description: string = "";


  constructor(private route: Router, private store: Store, private datePipe: DatePipe, private dashboardmaintosecondService: DashboardmaintosecondService) {}

  ngOnInit(): void {
    this.dateVal = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.dashboardmaintosecondService.currentSupervisor.subscribe(supervisor => this.selectedSupervisor = supervisor);
    this.dashboardmaintosecondService.currentOrganization.subscribe(organization => this.selectedOrganization = organization);
    console.log("Dashboard 2 :", this.selectedSupervisor, this.selectedOrganization);
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if((changes['start_time_h'] && !changes['start_time_h'].firstChange) && (changes['start_time_m'] && !changes['start_time_m'].firstChange) &&
  //   (changes['end_time_h'] && !changes['end_time_h'].firstChange) && (changes['end_time_m'] && !changes['end_time_m'].firstChange)) {
  //     this.calculateTimeDifference();
  //   }
  // }

  onInput(currentInput?: HTMLInputElement, nextInput?: HTMLInputElement | HTMLSelectElement): void {

    if (currentInput && nextInput && currentInput.value.length == 2) {
      nextInput.focus();
    }
  }

  calculateTimeDifference() {

    if(this.start_time_h === "" || this.start_time_m === "" || this.start_time_ampm === "" || this.end_time_h === "" || this.end_time_m === "" || this.end_time_ampm === "") {
      console.log("Vals:", this.start_time_h, this.start_time_m, this.start_time_ampm, this.end_time_h, this.end_time_m, this.end_time_ampm);
      if(this.start_time_h !== "0" || this.start_time_h !== "0" || this.end_time_h !== "0" || this.end_time_m !== "0")
        return;
    }

    const startTime = this.convertto24HourFormat(this.start_time_h + ":" + this.start_time_m, this.start_time_ampm);
    const endTime = this.convertto24HourFormat(this.end_time_h + ":" + this.end_time_m, this.end_time_ampm);

    console.log("Start time:", startTime, "  End time:", endTime);

    const zeroPad = (value: number): string => (value < 10 ? `0${value}` : `${value}`);

    this.startTime = `${zeroPad(startTime!.getHours())}:${zeroPad(startTime!.getMinutes())}:${zeroPad(startTime!.getSeconds())}`;
    this.endTime = `${zeroPad(endTime!.getHours())}:${zeroPad(endTime!.getMinutes())}:${zeroPad(endTime!.getSeconds())}`;

    if (startTime !== null && endTime !== null && startTime < endTime) {
      const timeDifferenceInMilliseconds = endTime.getTime() - startTime.getTime();
      const timeDifferenceMinutes = timeDifferenceInMilliseconds / (1000 * 60);
      this.timeDifference = parseFloat((timeDifferenceMinutes / 60).toFixed(2));
      this.tempTimeDifference = this.timeDifference;
    } else {
      this.timeDifference = -1;
      this.tempTimeDifference = -1;
    }

    console.log("Time Diff:", this.timeDifference, "Start:", startTime, "End:", endTime);
  }

  convertto24HourFormat(time: string, ampm: string): Date | null {

    console.log("Time: ", time, "AMPM: ", ampm);

    const match = time.match(/^(\d{1,2}):(\d{1,2})$/);
    console.log("Match: ", match)
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);

      if (hours === 12 && ampm === 'AM') {
        hours = 0;
      } else if (hours !== 12 && ampm === 'PM') {
        hours += 12;
      }

      const date = new Date();
      date.setHours(hours, minutes, 0, 0);

      return date;
    }
    return null;
  }

  saveHours(hoursform: NgForm) {
    if(!this.selectedSupervisor || !this.selectedOrganization){
      console.log("No supervisor / organization values obtained:", this.selectedSupervisor, this.selectedOrganization);
      return
    }
    console.log("Supervisor :", this.selectedSupervisor, "Organization :", this.selectedOrganization, "Date:", this.date, "Start Time:", this.startTime, "End Time:", this.endTime);
    if(this.isIndependent) {
      console.log("| Independent | Restricted :", this.restrictedHours, typeof(this.restrictedHours), "Unrestricted :", this.unrestrictedHours, "Description :", this.description);
      alert("Hours Saved!");
      this.store.dispatch(AuthActions.addIndependentHours({ data: { UserEmail: JSON.parse(sessionStorage.getItem('user')!).email, Date: this.date, StartTime: this.startTime, EndTime: this.endTime, Supervisor: this.selectedSupervisor, Organization: this.selectedOrganization, Restricted: this.restrictedHours, Unrestricted: this.unrestrictedHours, Description: this.description  } }))
      window.location.reload();
    } else if(this.isSupervised) {
      console.log("| Supervised | Restricted :", this.individualRestricted, "Individual Unrestricted :", this.individualUnrestricted, "Group Unrestricted :", this.groupUnrestricted, "Contact Type :", this.contact_type, "Format Type :", this.format_type, "Description :", this.description);
      alert("Hours Saved!");
      this.store.dispatch(AuthActions.addSupervisedHours({ data: { UserEmail: JSON.parse(sessionStorage.getItem('user')!).email, Date: this.date, StartTime: this.startTime, EndTime: this.endTime, Supervisor: this.selectedSupervisor, Organization: this.selectedOrganization, IndividualRestricted: this.individualRestricted, IndividualUnrestricted: this.individualUnrestricted, GroupUnrestricted: this.groupUnrestricted, ContactType: this.contact_type, FormatType: this.format_type, Description: this.description  } }))
      window.location.reload();
    }
  }

  buttontoggle(value: string) {
    if(value === 'Independent') {
      this.isIndependent = true;
      this.isSupervised = false;
    } else if(value === 'Supervised') {
      this.isIndependent = false;
      this.isSupervised = true;
    }
    this.contact_type = "";
    this.format_type = "";
    this.timeDifference = this.tempTimeDifference;
    this.restrictedHours = 0;
    this.unrestrictedHours = 0;
    this.individualRestricted = 0;
    this.individualUnrestricted = 0;
    this.groupUnrestricted = 0;
    this.description = "";
  }

  setContactType(value: string) {
    this.contact_type = value;
  }

  isSaveButtonEnabled(type: string): boolean {
    if(this.timeDifference === -1)
        return false;
    if(type == "independent"){
      if(!this.restrictedHours && !this.unrestrictedHours) {
        this.timeDifference = this.tempTimeDifference;
        return false;
      }
      const total = Number(this.restrictedHours) + Number(this.unrestrictedHours);
      this.timeDifference = this.tempTimeDifference - total;
      if(total == this.tempTimeDifference) {
        this.timeDifference = 0;
      }
      return total === this.tempTimeDifference;
    } else if(type == "supervised") {
      if(!this.individualRestricted && !this.individualUnrestricted && !this.groupUnrestricted) {
        this.timeDifference = this.tempTimeDifference;
        return false;
      }
      const total = Number(this.individualRestricted) + Number(this.individualUnrestricted) + Number(this.groupUnrestricted);
      this.timeDifference = this.tempTimeDifference - total;
      if(total == this.tempTimeDifference) {
        this.timeDifference = 0;
      }
      console.log("Supervised Change:", this.individualRestricted, this.individualUnrestricted, this.groupUnrestricted, this.timeDifference, this.tempTimeDifference, total);
      return total === this.tempTimeDifference;
    }
    return false;
  }

}
