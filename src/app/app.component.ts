import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import {} from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common'; // Use CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,
    RouterModule,
    JwtModule,
    CommonModule,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule  // Add this import to provide HttpClient
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud_project';
}
