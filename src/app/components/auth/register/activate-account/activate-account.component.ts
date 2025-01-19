import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this!
import { FormsModule } from '@angular/forms'; // ✅ Import this!
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CodeInputModule } from 'angular-code-input';
import { skipUntil } from 'rxjs';

@Component({
  selector: 'app-activate-account',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      ButtonModule,
      RouterModule,
      CodeInputModule
    ],
  
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent{
  message = '';
  isOkay = true;
  submitted = false;
  mfaEnabled: boolean | undefined; // Will be assigned via route state
  secretImageUri: string | undefined;
  registerEmail: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.mfaEnabled = navigation?.extras.state?.['mfaEnabled'];
    console.log("mfaEnabled field: " + this.mfaEnabled);
    this.secretImageUri = navigation?.extras.state?.['secretImageUri'];
    console.log(this.secretImageUri);
    this.registerEmail = navigation?.extras.state?.['registerEmail'];
    console.log(this.registerEmail);
  }

  private confirmAccount(token: string) {
    this.authService.activateAccount(token).subscribe({
      next: () => {

        this.message = 'Your account has been successfully activated.\nNow you can proceed to login';
        this.submitted = true;
      },
      error: () => {
        this.message = 'Token has been expired or invalid';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  redirectToTwoFactorAuthentication() {
    this.router.navigate(['two-factor-authentication'],
      {
        state: { 
         secretImageUri: this.secretImageUri,
         registerEmail: this.registerEmail
         } 
       }
    );
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  protected readonly skipUntil = skipUntil;

}
