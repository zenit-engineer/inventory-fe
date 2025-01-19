import { Component } from '@angular/core';
import { AuthenticationRequest } from 'src/app/interfaces/authentication-request';
import { AuthenticationService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token-service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import this!
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthenticationResponse } from 'src/app/interfaces/authentication-response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
    RouterLink,
    RouterModule
  ],
  providers:[
    MessageService,
    AuthenticationService
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {
    email: '', 
    password: ''
  };
  errorMsg: Array<string> = [];
  authResponse: AuthenticationResponse = {};

  constructor(
    private router: Router, 
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private messageService: MessageService
  ){}

  login() {
    this.authService.authenticate(this.authRequest)
      .subscribe({
        next: (response: AuthenticationResponse) => {
          this.authResponse = response;
          if (!this.authResponse.mfaEnabled) {
            this.tokenService.accessToken = response.accessToken || '';
            this.tokenService.refreshToken = response.refreshToken || '';
            this.router.navigate(['home']);
          }else if (this.authResponse.mfaEnabled) {
            this.router.navigate(['two-factor-authentication'], 
              {
               state: { 
                registerEmail: this.authRequest.email, 
                } 
              });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed to Sign In!',
              detail: 'User Not Found!', // Show the actual backend error message
              life: 5000
            });
          }
        },
        error: (err) => {
          const errorMsgs = err?.error?.error || 'An unexpected error occurred';
        
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to Sign In!',
            detail: errorMsgs, // Show the actual backend error message
            life: 5000
          });
        }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
