import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { BaseRoutingModule } from './base-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
    BaseComponent, 
    HeaderComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SidebarModule,
    ButtonModule
  ], 
  exports: [
    BaseComponent, 
    HeaderComponent, 
    FooterComponent
  ]
})
export class BaseModule { }

