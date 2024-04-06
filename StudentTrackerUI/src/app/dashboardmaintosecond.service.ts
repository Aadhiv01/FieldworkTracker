import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardmaintosecondService {

  private supervisorSource = new BehaviorSubject<string>('');
  private organizationSource = new BehaviorSubject<string>('');
  currentSupervisor = this.supervisorSource.asObservable();
  currentOrganization = this.organizationSource.asObservable();

  constructor() { }

  changeMessage(supervisor: string, organization: string) {
    console.log("In change message:", supervisor, organization);
    this.supervisorSource.next(supervisor);
    this.organizationSource.next(organization);
  }

}
