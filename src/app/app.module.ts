import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { StatisticsModule } from './components/statistics/statistics.module';
import { ButtonModule } from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { HttpTokenInterceptor } from './interceptor/http-token-interceptor';
import { ToastModule } from 'primeng/toast';
import { ChangePasswordModule } from './components/change-password/change-password.module';
import { BaseModule } from './components/base/base.module';
import { LoginModule } from './components/auth/login/login.module';
import { HomeModule } from './components/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    StatisticsModule,
    SidebarModule,
    ButtonModule,
    LoginModule,
    HomeModule,
    HttpClientModule,
    JwtModule,
    ToastModule,
    BaseModule,
    ChangePasswordModule
  ],
  exports:[
    
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
