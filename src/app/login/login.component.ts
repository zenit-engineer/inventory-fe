import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { UserCredential } from '../interfaces/user-credential';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import this!

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  })
  visible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) {
  }
  // showDialog() {
  //   this.visible = true;
  // }
  showLogin = true;  // Toggling the login form visibility

  closeDialog() {
      this.visible = false;
  }

  submitForm() {
    if (this.loginForm.valid) {

      const userCredentials: UserCredential = {
        username: this.loginForm.value.username!,
        password: this.loginForm.value.password!
      };

      console.log('Username:', userCredentials.username);
      console.log('Password:', userCredentials.password);

      this.getAccessToken(userCredentials);
    } else {
      this.msgService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill in all required fields correctly.'
      });
    }
  }

  getAccessToken(userCredentials: UserCredential) {
  //   this.authService.generateAccessToken(userCredentials).subscribe({
  //     next: (data) => {
  //       const token: string = data.token;
  //       const accessToken: string = data.accessToken;

  //       console.log("access-token:", accessToken);
  //       console.log("token-id:", token);

  //       localStorage.setItem('accessToken', accessToken);
  //       localStorage.setItem('token-id', token);

  //       this.router.navigate(['/homepage']);
  //     },
  //     error: (error) => {
  //       console.error('Login error:', error);
  //       this.msgService.add({
  //         severity: 'error',
  //         summary: 'Login Failed',
  //         detail: error.error?.message || 'Invalid credentials'
  //       });
  //     }
  //   });
  // }
  }
}
