import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { map, Subscription } from 'rxjs';
import { RegistrationRequest } from 'src/app/interfaces/registration-request';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];
  subscriptions: Subscription[] = [];
  authenticationSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register(registrationRequest: RegistrationRequest) {
    this.authenticationSubscription = this.authService.register(registrationRequest).subscribe(
      (next) => { 
        this.router.navigate(['activate-account']);
      },
      (error) => {
        this.errorMsg = error.error.validationErrors;
      }
    );
  }  

}