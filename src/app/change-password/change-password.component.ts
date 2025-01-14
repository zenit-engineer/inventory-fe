import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';
import { changePasswordMismatchValidator } from '../shared/password-mismatch-validator.directive';
import { ChangePasswordRequest } from '../interfaces/change-password-request';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required]), 
      newPassword: new FormControl('', [Validators.required]),
      confirmationPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: changePasswordMismatchValidator,
    }
  );

  errorMsg: Array<string> = [];
  subscriptions: Subscription[] = [];
  changePasswordSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  changePassword() {
  const postData = { ...this.changePasswordForm.value };

  this.changePasswordSubscription = this.authService.changePassword(postData as ChangePasswordRequest).subscribe(
    () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successfully changed Password',
        detail: 'Please log in with new password',
        life: 5000
      });        

      setTimeout(() => {
        this.router.navigate(['login']);
      }, 500); // Delay navigation to allow message display
    },
    (errorResponse) => {
      // Check if error response has a body and extract the error message
      const errorMsg = errorResponse?.error?.error || 'An unexpected error occurred';
      
      this.messageService.add({
        severity: 'error',
        summary: 'Failed to Change Password',
        detail: errorMsg, // Show the actual backend error message
        life: 5000
      });
    }
  );

  this.subscriptions.push(this.changePasswordSubscription);
}


  get currentPassword() {
    return this.changePasswordForm.controls['currentPassword'];
  }

  get newPassword() {
    return this.changePasswordForm.controls['newPassword'];
  }

  get confirmationPassword() {
    return this.changePasswordForm.controls['confirmationPassword'];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
