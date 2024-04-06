import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgForm, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { LoginpageComponent } from './loginpage/loginpage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserguideComponent } from './userguide/userguide.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ProfilecompleteComponent } from './profilecomplete/profilecomplete.component';
import { ProfilepagemainComponent } from './profilepagemain/profilepagemain.component';
import { DashboardmainComponent } from './dashboardmain/dashboardmain.component';
import { DashboardsecondComponent } from './dashboardsecond/dashboardsecond.component';
import { MonthsummaryComponent } from './monthsummary/monthsummary.component';
import { BulkhoursComponent } from './bulkhours/bulkhours.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { TotalhourspageComponent } from './totalhourspage/totalhourspage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    NavbarComponent,
    UserguideComponent,
    LandingpageComponent,
    ProfilecompleteComponent,
    ProfilepagemainComponent,
    DashboardmainComponent,
    DashboardsecondComponent,
    MonthsummaryComponent,
    BulkhoursComponent,
    TotalhourspageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
