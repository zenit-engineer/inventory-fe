import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';
import { catchError, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  subscriptions: Subscription[] = [];
  logoutSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService 
  ) {}

  display: boolean = false;

  logOut() {
    this.logoutSubscription = this.authenticationService.logOut().pipe(
      tap(() => {
        console.log("Successfully Logged Out!");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Logout failed', error);
        return []; // Return empty array or an empty observable
      })
    ).subscribe({
      next: () => {
        // Successful logout will be handled in tap
      },
      error: (error) => {
        console.error('Error during logout:', error);
      }
    });
  
    this.subscriptions.push(this.logoutSubscription);
  }
  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
