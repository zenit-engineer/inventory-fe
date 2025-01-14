import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    PasswordModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule
  ]
})
export class ChangePasswordModule { }
