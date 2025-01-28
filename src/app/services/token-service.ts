import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set accessToken(accessToken: string) {
    localStorage.setItem('accessToken', accessToken);
  }

  get accessToken() {
    return localStorage.getItem('accessToken') as string;
  }

  set refreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  get refreshToken() {
    return localStorage.getItem('refreshToken') as string;
  }

  set role(roles: string[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  get role() {
    const storedRoles = localStorage.getItem('roles');
    return storedRoles ? JSON.parse(storedRoles) : [];  // Parse the JSON string back to an array, or return an empty array if not found
  }  

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('mfaEnabled');
    localStorage.removeItem('roles');
  }

  isAccessTokenValid() {
    const accessToken = this.accessToken;
    if (!accessToken) {
      return false;
    }
    // decode the accessToken
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isAccessTokenExpired = jwtHelper.isTokenExpired(accessToken);
    if (isAccessTokenExpired) {
      // localStorage.setItem('accessToken', this.refreshToken);
      return false;
    }
    return true;
  }

  isRefreshTokenValid() {
    const refreshToken = this.refreshToken;
    if (!refreshToken) {
      return false;
    }
    // decode the refreshToken
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isRefreshTokenExpired = jwtHelper.isTokenExpired(refreshToken);
    if (isRefreshTokenExpired) {
      return false;
    }
    return true;
  }

  get userRoles(): string[] {
    const token = this.accessToken;
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      console.log(decodedToken.roles);
      return decodedToken.roles;
    }
    return [];
  }
}
