import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginpageService {

  // isUserLoggedIn: boolean = false;

  // login(userName: string, password: string) {
  //   console.log(userName);
  //   console.log(password);
  //   this.isUserLoggedIn = true;//userName == 'admin' && password == 'admin';
  //   localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
  // }

  // logout(): void {
  //   this.isUserLoggedIn = false;
  //      localStorage.removeItem('isUserLoggedIn');
  //   }


}
