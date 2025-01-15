import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpTokenInterceptor } from './interceptor/http-token-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,
    RouterModule,
    HttpClientModule,
    JwtModule,
    ToastModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud_project';
}
