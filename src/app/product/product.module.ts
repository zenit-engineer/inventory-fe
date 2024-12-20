import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {HttpClientModule} from '@angular/common/http'


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
