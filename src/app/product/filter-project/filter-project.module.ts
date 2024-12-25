import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FilterProjectComponent } from './filter-project.component';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    FilterProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule  
  ],
  exports:[
    FilterProjectComponent
  ]
})
export class FilterProjectModule { }
