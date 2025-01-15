import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { MessageService } from 'primeng/api';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),           // Provide routes globally
    MessageService,                  // Provide MessageService globally
    importProvidersFrom(HttpClientModule), // Import and provide HttpClientModule
  ],
}).catch(err => console.error(err));
