import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { AuthenticationRequest } from 'src/app/interfaces/authentication-request';
import { VerificationRequest } from 'src/app/interfaces/verification-request';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-two-factor-authentication',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule
  ],
  templateUrl: './two-factor-authentication.component.html',
  styleUrl: './two-factor-authentication.component.scss'
})
export class TwoFactorAuthenticationComponent implements OnChanges{

  secretImageUri: string | undefined;
  registerEmail: string = '';
  otpCode = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService
  ){
    const navigation = this.router.getCurrentNavigation();
    this.secretImageUri = navigation?.extras.state?.['secretImageUri'];
    this.registerEmail = navigation?.extras.state?.['registerEmail'];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['registerEmail']) {
      console.log('registerEmail has changed:', this.registerEmail);
    }
  }
  
  verifyCode() {
    const verifyRequest: VerificationRequest = {
      email: this.registerEmail,
      code: this.otpCode
    };
  
    this.authService.verifyCode(verifyRequest).subscribe({
      next: (response) => {
        // Handle successful response
        localStorage.setItem('accessToken', response.accessToken as string);
        localStorage.setItem('refreshToken', response.refreshToken as string);
        localStorage.setItem('mfaEnabled', String(response.mfaEnabled as boolean));
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

}
