import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this!
import { FormsModule } from '@angular/forms'; // ✅ Import this!
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { ActivateAccountComponent } from '../activate-account/activate-account.component';
import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CodeInputModule } from 'angular-code-input';


@NgModule({
  declarations: [LoginComponent, ActivateAccountComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    CodeInputModule
  ],
  exports:[
    LoginComponent
  ]
})
export class LoginModule { }
