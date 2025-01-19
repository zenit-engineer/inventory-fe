import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationRequest } from '../interfaces/registration-request';
import { AuthenticationRequest } from '../interfaces/authentication-request';
import { AuthenticationResponse } from '../interfaces/authentication-response';
import { ChangePasswordRequest } from '../interfaces/change-password-request';
import { VerificationRequest } from '../interfaces/verification-request';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = environment.backend_url;

  constructor(private http: HttpClient) {}

  register(registrationRequest: RegistrationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/register`, registrationRequest);
  }

  activateAccount(activationToken: string): Observable<AuthenticationResponse> {
    const params = new HttpParams().set('activationToken', activationToken);
    return this.http.get<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/activate-account`, {params});
  }

  authenticate(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/authenticate`, authenticationRequest);
  }

  refreshToken(): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/refresh-token`, {});
  }

  logOut(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/v1/auth/logout`, {});
  }

  changePassword(changePasswordRequest: ChangePasswordRequest): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/api/v1/user`, changePasswordRequest);
  }

  verifyCode(verificationRequest: VerificationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/verify`, verificationRequest);
  }
  
}
