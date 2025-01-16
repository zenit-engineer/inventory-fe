import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router, 
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private messageService: MessageService
  ){}

  login() {
    this.errorMsg = [];
    this.authService.authenticate(this.authRequest).subscribe({
      next: (res) => {
        // Access the accessToken from the response
        this.tokenService.accessToken = res.accessToken || '';
        this.tokenService.refreshToken = res.refreshToken || '';
        this.router.navigate(['home']);
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
