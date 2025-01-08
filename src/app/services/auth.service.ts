import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistrationRequest } from '../interfaces/registration-request';
import { AuthenticationRequest } from '../interfaces/authentication-request';
import { AuthenticationResponse } from '../interfaces/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = environment.backend_url;

  constructor(private http: HttpClient) {}

  register(registrationRequest: RegistrationRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/api/v1/auth/register`, registrationRequest);
  }

  activateAccount(activationToken: string): Observable<AuthenticationResponse> {
    const params = new HttpParams().set('token', activationToken);
    return this.http.get<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/activate-account`, {params});
  }

  authenticate(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/api/v1/auth/authenticate`, authenticationRequest);
  }
  
}
