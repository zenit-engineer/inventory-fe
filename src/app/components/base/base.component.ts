import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router'; // Import RouterModule if you need routing

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    HeaderComponent,
    FooterComponent,
    RouterModule
  ],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

}
