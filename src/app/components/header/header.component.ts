import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';
import { catchError, Subscription, tap } from 'rxjs';
import { TokenService} from '../../services/token-service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router'; // Add this import
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    RouterModule,
    ToolbarModule,
    ToggleSwitch,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  subscriptions: Subscription[] = [];
  logoutSubscription: Subscription = new Subscription();
  adminRole: boolean = false;
  formGroup: FormGroup;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenService: TokenService
  ) {
    this.formGroup = new FormGroup({
      checked: new FormControl<boolean>(false)
    });
  }

  ngOnInit(): void {

    // Subscribe to 'valueChanges'
    this.formGroup.get('checked')?.valueChanges.subscribe((checked: boolean) => {
      console.log('Checked value changed:', checked);  // This should log when the toggle changes
      this.toggleDarkMode();
    });

    const userRoles = this.tokenService.role;
    if(userRoles.includes("ADMIN")){
      this.adminRole = true;
      console.log(this.adminRole);
    }
  }
  toggleLightMode() {
    document.querySelector('html')?.classList.toggle('false');
  }

  display: boolean = false;

  logOut() {
    this.logoutSubscription = this.authenticationService.logOut().pipe(
      tap(() => {
        this.tokenService.clearTokens();
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

  toggleDarkMode() {
    document.querySelector('html')?.classList.toggle('my-app-dark');
  }  

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
