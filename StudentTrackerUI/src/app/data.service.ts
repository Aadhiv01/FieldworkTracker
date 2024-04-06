import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from './state/auth.actions';
import { selectUserType } from './state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:5238/fieldworktracker';

  constructor(private http: HttpClient, private store: Store) {}

  login(data: { email: string; password: string }): Observable<any> {
    console.log("Logging in:", data);
    return this.http.post<any>(`${this.apiUrl}/user/login`, data).pipe(
      tap((response) => this.handleLoginSuccess(response)),
      catchError((error) => of(this.handleLoginFailure(error)))
    );
  }

  logout(): Observable<any> {
    console.log("Logout succesfull");
    return of({});
  }

  private handleLoginSuccess(response: any) {
    const userData = response.data;
    console.log('Login successful:', response, " | ", userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    this.store.dispatch(AuthActions.setUserType({ userType: userData['UserType'] }));
    this.store.select(selectUserType).subscribe(userType => {
      console.log("User Type:", userType);
    });
    return true;
  }

  private handleLoginFailure(error: any) {
    console.error('Login failed:', error);
    return false;
  }

  getSupervisors(): Observable<any> {
    const data = { userEmail: JSON.parse(sessionStorage.getItem('user')!).email };
    console.log("User: ", data, " | ", data.userEmail, " | ", typeof(data.userEmail));
    return this.http.post<any>(`${this.apiUrl}/supervisor/get-all`, data);
  }

  addSupervisor(data: { FirstName: string, LastName: string, email: string, bacbid: string, qualification: string, userEmail: string }): Observable<any> {
    console.log("Supervisor Add: ", data, typeof(data));
    return this.http.post<any>(`${this.apiUrl}/supervisor/add-supervisor`, data);
  }

  editSupervisor(data: { FirstName: string, LastName: string, email: string, bacbid: string, qualification: string, userEmail: string }): Observable<any> {
    console.log("Edit Supervisor:", data);
    return this.http.put<any>(`${this.apiUrl}/supervisor/update`, data)
  }

  getOrganizations(): Observable<any> {
    const data = { userEmail: JSON.parse(sessionStorage.getItem('user')!).email };
    console.log("Organization User: ", data, " | ", data.userEmail, " | ", typeof(data.userEmail));
    return this.http.post<any>(`${this.apiUrl}/organization/get-all`, data);
  }

  addOrganization(data: { name: string, userEmail: string }): Observable<any> {
    console.log("Organization Add: ", data, typeof(data));
    return this.http.post<any>(`${this.apiUrl}/organization/add-organization`, data);
  }

  editOrganization(data: { name: string, userEmail: string }): Observable<any> {
    console.log("Edit Organization: ", data);
    return this.http.put<any>(`${this.apiUrl}/organization/update`, data);
  }

  getHours(hoursType: string, dateTime?: Date | null): Observable<any> {
    const data = { userEmail: JSON.parse(sessionStorage.getItem('user')!).email, Date: dateTime };
    console.log("Get Hours:", data, " | ", data.userEmail, " | Route: ", `${this.apiUrl}/hoursTracker/${hoursType}/get-all`);
    return this.http.post<any>(`${this.apiUrl}/hoursTracker/${hoursType}/get-all`, data);
  }

  addIndependentHours(data: { UserEmail: string, Date: Date, StartTime: string, EndTime: string, Supervisor: string, Organization: string, Restricted: number, Unrestricted: number, Description: string }): Observable<any> {
    console.log("Add Independent Hours:", data, typeof(data.Restricted), typeof(data.Unrestricted));
    return this.http.post<any>(`${this.apiUrl}/hoursTracker/independent/add`, data);
  }

  addSupervisedHours(data: { UserEmail: string, Date: Date, StartTime: string, EndTime: string, Supervisor: string, Organization: string, IndividualRestricted: number, IndividualUnrestricted: number, GroupUnrestricted: number, ContactType: string, FormatType: string, Description: string }): Observable<any> {
    console.log("Add Supervised Hours:", data);
    return this.http.post<any>(`${this.apiUrl}/hoursTracker/supervised/add`, data);
  }

  getHoursData(UserEmail: string, dateTime?: Date | null): Observable<any> {
    const data = { UserEmail: UserEmail, dateTime: dateTime };
    console.log("Total hours fetch:", data);
    return this.http.post<any>(`${this.apiUrl}/hoursTracker/hours/get`, data);
  }

  addHours(data: { UserEmail: string; Date: Date; StartTime: string; EndTime: string; Supervisor: string; SupervisorEmail: string; Organization: string; IndividualRestricted: number; Restricted: number; Unrestricted: number; IndividualUnrestricted: number; GroupUnrestricted: number; ContactType: string; FormatType: string; Description: string; HoursType: string; }) {
    console.log("Add Hours:", data);
    return this.http.post<any>(`${this.apiUrl}/hoursTracker/hours/add`, data);
  }
}
