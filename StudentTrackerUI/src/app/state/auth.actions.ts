import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ data: { email: string; password: string } }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: any }>());
export const setUserType = createAction('[Auth] Set User Type', props<{ userType: string }>());
export const addSupervisor = createAction('[Add] Add Supervisor', props<{ data: { FirstName: string, LastName: string, email: string, bacbid: string, qualification: string, userEmail: string } }>());
export const addSupervisorSuccess = createAction('[Add] Add Supervisor Success');
export const addSupervisorFailure = createAction('[Add] Add Supervisor Failure');
export const addOrganization = createAction('[Add] Add Organization', props<{ data: { name: string, userEmail: string } }>());
export const addOrganizationSuccess = createAction('[Add] Add Organization Success');
export const addOrganizationFailure = createAction('[Add] Add Organization Failure');
export const addIndependentHours = createAction('[Add] Add IndependentHours', props<{ data: { UserEmail: string, Date: Date, StartTime: string, EndTime: string, Supervisor: string, Organization: string, Restricted: number, Unrestricted: number, Description: string } }>());
export const addIndependentHoursSuccess = createAction('[Add] Add IndependentHours Success');
export const addIndependentHoursFailure = createAction('[Add] Add IndependentHours Failure');
export const addSupervisedHours = createAction('[Add] Add SupervisedHours', props<{ data: { UserEmail: string, Date: Date, StartTime: string, EndTime: string, Supervisor: string, Organization: string, IndividualRestricted: number, IndividualUnrestricted: number, GroupUnrestricted: number, ContactType: string, FormatType: string, Description: string } }>());
export const addSupervisedHoursSuccess = createAction('[Add] Add SupervisedHours Success');
export const addSupervisedHoursFailure = createAction('[Add] Add SupervisedHours Failure');
export const addHours = createAction('[Add] Add Hours', props<{ data: { UserEmail: string, Date: Date, StartTime: string, EndTime: string, Supervisor: string, SupervisorEmail: string, Organization: string, IndividualRestricted: number, Restricted: number, Unrestricted: number, IndividualUnrestricted: number, GroupUnrestricted: number, ContactType: string, FormatType: string, Description: string, HoursType: string } }>());
export const addHoursSuccess = createAction('[Add] Add Hours Success');
export const addHoursFailure = createAction('[Add] Add Hours Failure');

