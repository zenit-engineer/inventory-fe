import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth.service';
import { passwordMismatchValidator } from '../../shared/password-mismatch-validator.directive';
import { RegistrationRequest } from 'src/app/interfaces/registration-request';

@Component({
  selector: 'app-register',
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
    private authService: AuthenticationService
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
        this.errorMsg = error.error.validationErrors;
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
