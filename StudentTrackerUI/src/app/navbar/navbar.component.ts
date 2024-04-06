import { Component, NgZone, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AuthActions from '../state/auth.actions';
import { selectIsLoggedIn, selectUser } from '../state/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  user$!: Observable<any>;

  constructor(private store: Store, private router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.user$ = this.store.select(selectUser);
  }

  logout(): void {
    console.log("In logout");
    this.store.dispatch(AuthActions.logout());

    this.ngZone.run(() => {
      this.store.select(selectIsLoggedIn)
        .pipe(
          tap(isLoggedIn => console.log('IsLoggedIn value:', isLoggedIn))
        )
        .subscribe();

      this.router.navigate(['/login']);
    });
  }

}
