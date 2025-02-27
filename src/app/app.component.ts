import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common'; // Use CommonModule
import { PrimeNG } from 'primeng/config';

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
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private primeng: PrimeNG) {}

  title = 'crud_project';

  ngOnInit() {
    this.primeng.ripple.set(true);
  }
}
