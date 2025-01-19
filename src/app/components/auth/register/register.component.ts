import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';
import { RegistrationRequest } from 'src/app/interfaces/registration-request';
import { passwordMismatchValidator } from 'src/app/shared/password-mismatch-validator.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this!
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthenticationResponse } from 'src/app/interfaces/authentication-response';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { TwoFactorAuthenticationComponent } from './two-factor-authentication/two-factor-authentication.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    MessageModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
    RouterLink,
    CheckboxModule,
    ActivateAccountComponent,
    TwoFactorAuthenticationComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9\._%\+\-]+@[a-z0-9\.\-]+\.[a-z]{2,}$/),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      mfaEnabled: new FormControl(false)
    },
    {
      validators: passwordMismatchValidator,
    }
  );

  errorMsg: Array<string> = [];
  subscriptions: Subscription[] = [];
  authenticationSubscription: Subscription = new Subscription();
  authResponse: AuthenticationResponse = {};

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  register() {
    if (this.registerForm.invalid) {
      return; // Prevent submission if the form is invalid
    }
  
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword; // Remove confirmPassword before sending data to the backend
  
    this.authenticationSubscription = this.authService.register(postData as RegistrationRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.authResponse = response;
            this.router.navigate(['activate-account'], 
              {
               state: { 
                mfaEnabled: this.authResponse.mfaEnabled, 
                secretImageUri: this.authResponse.secretImageUri,
                registerEmail: this.registerForm.controls['email'].value
                } 
              });
          }
        },
        error: (error) => {
          const errorMsg = error?.error?.validationErrors || error?.error?.error || 'An unexpected error occurred';
  
          this.messageService.add({
            severity: 'error',
            summary: 'Failed to Register',
            detail: errorMsg,
            life: 5000
          });
        }
      });
  
    this.subscriptions.push(this.authenticationSubscription);
  }
  

  get firstname() {
    return this.registerForm.controls['firstname'];
  }

  get lastname() {
    return this.registerForm.controls['lastname'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
