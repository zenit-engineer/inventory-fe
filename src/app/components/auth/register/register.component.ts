import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';
import { RegistrationRequest } from 'src/app/interfaces/registration-request';
import { passwordMismatchValidator } from 'src/app/shared/password-mismatch-validator.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this!
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    CardModule,
    DividerModule,
    MessageModule,
    PasswordModule,
    InputTextModule,
    ToastModule
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
    },
    {
      validators: passwordMismatchValidator,
    }
  );

  errorMsg: Array<string> = [];
  subscriptions: Subscription[] = [];
  authenticationSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  login() {
    this.router.navigate(['login']);
  }

  onRegister() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword; // Remove confirmPassword before sending data to the backend

    this.authenticationSubscription = this.authService.register(postData as RegistrationRequest).subscribe(
      () => {
        this.router.navigate(['activate-account']);
      },
      (error) => {
        // Check if error response has a body and extract the error message
        const errorMsg = error?.error?.validationErrors || error?.error?.error || 'An unexpected error occurred';
              
        this.messageService.add({
          severity: 'error',
          summary: 'Failed to Register',
          detail: errorMsg, // Show the actual backend error message
          life: 5000
        });      
      }
    );
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
