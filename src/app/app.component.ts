import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common'; // Use CommonModule
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,
    RouterModule,
    JwtModule,
    CommonModule,
  ],
  providers:[
    MessageService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud_project';
}
