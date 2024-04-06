import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { LoginpageService } from './loginpage.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../state/auth.actions';
import { selectIsLoggedIn, selectUser } from '../state/auth.selectors';
import { delay, take, tap } from 'rxjs';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})


export class LoginpageComponent implements OnInit {

  username: string;
  password: string;
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  user$ = this.store.select(selectUser);
  fieldTextType: boolean = false;

  constructor(private loginpageservice: LoginpageService, private router: Router, private store: Store) {
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {

  }

  login(loginform: NgForm) {
    if (loginform) {
      this.store.dispatch(AuthActions.login({ data: { email: this.username, password: this.password } }));
      this.store.select(selectIsLoggedIn)
        .pipe(
          delay(0),
          take(1),
          tap(isLoggedIn => console.log('IsLoggedIn value:', isLoggedIn, this.store.select(selectIsLoggedIn)))
        )
        .subscribe();;

      this.store.select(selectIsLoggedIn).subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    console.log("Logout:", this.store.select(selectIsLoggedIn));
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
