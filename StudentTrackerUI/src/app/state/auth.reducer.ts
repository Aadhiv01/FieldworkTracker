import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  isLoggedIn: boolean;
  error: any | null;
  userType: string
}

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  error: null,
  userType: 'Supervisee'
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, isLoggedIn: true, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, user: null, isLoggedIn: false, error })),
  on(AuthActions.logoutSuccess, (state) => ({ ...initialState })),
  on(AuthActions.logoutFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.setUserType, (state, { userType }) => ({ ...state, userType })),
  on(AuthActions.addSupervisorSuccess, (state) => { return state }),
  on(AuthActions.addSupervisorFailure, (state) => { return state }),
  on(AuthActions.addIndependentHoursSuccess, (state) => { return state }),
  on(AuthActions.addIndependentHoursFailure, (state) => { return state }),
  on(AuthActions.addSupervisedHoursSuccess, (state) => { return state }),
  on(AuthActions.addSupervisedHoursFailure, (state) => { return state }),
  on(AuthActions.addHoursSuccess, (state) => { return state }),
  on(AuthActions.addHoursFailure, (state) => { return state }),
);
