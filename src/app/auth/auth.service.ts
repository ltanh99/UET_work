import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): Boolean {
    const expireTime = localStorage.getItem('session');
    return (parseInt(expireTime) > (new Date()).getTime())
  }
}
