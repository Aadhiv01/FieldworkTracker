import { Injectable, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import { Observable } from "rxjs";
import { selectIsLoggedIn } from "./auth.selectors";

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {

  private userAuthenticated: boolean = false;

  constructor(private store: Store) {}


  ngOnInit(): void {
    this.store.select(selectIsLoggedIn).subscribe((isLoggedIn) => this.userAuthenticated = isLoggedIn);
  }

  checkLoggedIn() {
    return this.userAuthenticated;
  }

}
