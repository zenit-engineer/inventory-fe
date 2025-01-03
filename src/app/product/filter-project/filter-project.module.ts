import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FilterProjectComponent } from './filter-project.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    FilterProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FileUploadModule,
    ToastModule  
  ],
  exports:[
    FilterProjectComponent
  ]
})
export class FilterProjectModule { }
