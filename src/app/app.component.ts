import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpTokenInterceptor } from './interceptor/http-token-interceptor';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common'; // Use CommonModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Import this for animations

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,
    RouterModule,
    JwtModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    MessageService, // Required for Toast functionality
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud_project';
}
