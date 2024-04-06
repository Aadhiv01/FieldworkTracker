import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { DataService } from '../data.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ data }) =>
        this.dataService.login(data).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.dataService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError((error) => of(AuthActions.logoutFailure({ error })))
        )
      )
    )
  );

  setUserType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      map(({ user }) => {
        const userType = user.userType;
        return AuthActions.setUserType({ userType });
      })
    )
  );

  addSupervisor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addSupervisor),
      switchMap(action =>
        this.dataService.addSupervisor(action.data).pipe(
          map(response => {
            if (response) {
              return AuthActions.addSupervisorSuccess();
            } else {
              return AuthActions.addSupervisorFailure();
            }
          }),
          catchError(error => of(AuthActions.addSupervisorFailure()))
        )
      )
    )
  );

  addOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addOrganization),
      switchMap(action =>
        this.dataService.addOrganization(action.data).pipe(
          map(response => {
            if (response) {
              return AuthActions.addOrganizationSuccess();
            } else {
              return AuthActions.addOrganizationFailure();
            }
          }),
          catchError(error => of(AuthActions.addOrganizationSuccess()))
        )
      )
    )
  );

  addIndependentHours$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addIndependentHours),
      switchMap(action =>
        this.dataService.addIndependentHours(action.data).pipe(
          map(response => {
            if (response) {
              return AuthActions.addIndependentHoursSuccess();
            } else {
              return AuthActions.addIndependentHoursFailure();
            }
          }),
          catchError(error => of(AuthActions.addIndependentHoursSuccess()))
        )
      )
    )
  );

  addSupervisedHours$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addSupervisedHours),
      switchMap(action =>
        this.dataService.addSupervisedHours(action.data).pipe(
          map(response => {
            if (response) {
              return AuthActions.addSupervisedHoursSuccess();
            } else {
              return AuthActions.addSupervisedHoursFailure();
            }
          }),
          catchError(error => of(AuthActions.addSupervisedHoursSuccess()))
        )
      )
    )
  );

  addHours$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.addHours),
      switchMap(action =>
        this.dataService.addHours(action.data).pipe(
          map(response => {
            if (response) {
              return AuthActions.addHoursSuccess();
            } else {
              return AuthActions.addHoursFailure();
            }
          }),
          catchError(error => of(AuthActions.addHoursSuccess()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private dataService: DataService) {}
}
