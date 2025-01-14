import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { BaseRoutingModule } from './base-routing.module';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

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

