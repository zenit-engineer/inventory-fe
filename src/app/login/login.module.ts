import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this!
import { FormsModule } from '@angular/forms'; // ✅ Import this!
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule
  ]
})
export class LoginModule { }
