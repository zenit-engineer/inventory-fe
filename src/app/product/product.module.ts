import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import {HttpClientModule} from '@angular/common/http'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditProductModule } from './add-edit-product/add-edit-product.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FilterProjectModule } from './filter-project/filter-project.module';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CategoryComponent } from './category/category.component';
import { MiniDialogModule } from './mini-dialog-add/mini-dialog.module';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    ProductComponent,
    ManufacturerComponent,
    SupplierComponent,
    CategoryComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    AddEditProductModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    FormsModule,
    FilterProjectModule,
    MiniDialogModule,
    FileUploadModule
],
  exports: [
    ProductComponent
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class ProductModule { }
