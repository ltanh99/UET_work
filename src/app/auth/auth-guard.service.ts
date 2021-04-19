import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {Router, CanActivate, CanDeactivate } from '@angular/router';
import {AuthService} from './auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(): boolean {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      localStorage.setItem('token', '');
      localStorage.setItem('userName', '');
      localStorage.setItem('password', '');
      localStorage.setItem('session', '');
      localStorage.setItem('common-info', '');

      return false;
    }
    return true;
  }
}
