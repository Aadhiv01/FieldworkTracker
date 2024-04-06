import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../state/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  isLoggedIn$: boolean = false;

  constructor(private dataService: DataService, private router: Router, private store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.store.select(selectIsLoggedIn).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isLoggedIn$ = true;
      }
      else {
        isLoggedIn = false;
      }
    });
    if (this.isLoggedIn$) {
      return true;
    } else {
      return this.router.createUrlTree(['/login']);
    }
  }
}
