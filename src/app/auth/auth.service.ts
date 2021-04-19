import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): Boolean {
    // const token = localStorage.getItem('token');
    // return !this.jwtHelper.isTokenExpired(token);
    const expireTime = localStorage.getItem('session');
    return (parseInt(expireTime) > (new Date()).getTime())
  }
}
