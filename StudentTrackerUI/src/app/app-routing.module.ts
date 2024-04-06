import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './state/auth.guard';

import { UserguideComponent } from './userguide/userguide.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LandingpageComponent } from './landingpage/landingpage.component'
import { ProfilecompleteComponent } from './profilecomplete/profilecomplete.component';
import { ProfilepagemainComponent } from './profilepagemain/profilepagemain.component';
import { DashboardmainComponent } from './dashboardmain/dashboardmain.component';
import { BulkhoursComponent } from './bulkhours/bulkhours.component';
import { MonthsummaryComponent } from './monthsummary/monthsummary.component';

import { authGuard } from './auth.guard';
import { TotalhourspageComponent } from './totalhourspage/totalhourspage.component';

const routes: Routes = [
  {
    path: 'user-guide',
    component: UserguideComponent,
  },
  {
    path: 'login',
    component: LoginpageComponent,
  },
  {
    path: '',
    component: LandingpageComponent
  },
  {
    path: 'welcome',
    component: ProfilecompleteComponent
  },
  {
    path: 'my-profile/:type',
    component: ProfilepagemainComponent,
  },
  {
    path: 'my-profile',
    component: ProfilepagemainComponent,
  },
  {
    path: 'dashboard',
    component: DashboardmainComponent,
  },
  {
    path: 'dashboard/period',
    component: MonthsummaryComponent,
  },
  {
    path: 'dashboard/bulk-hours',
    component: BulkhoursComponent
  },
  {
    path: 'dashboard/total-hours',
    component: TotalhourspageComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
