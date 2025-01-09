import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/interfaces/authentication-request';
import { AuthenticationService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token-service';

@Component({
  selector: 'app-login',
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
    private tokenService: TokenService
  ){}

  login() {
    this.errorMsg = [];
    this.authService.authenticate(this.authRequest).subscribe({
      next: (res) => {
        // Access the token from the response
        this.tokenService.token = res.token || '';
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.log(err);
        // Handle validation errors
        if (err.error && err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else if (err.error && err.error.errorMsg) {
          // Handle general error message
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    });
  }
  

  register() {
    this.router.navigate(['register']);
  }
}
