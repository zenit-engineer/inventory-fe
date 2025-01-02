import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MiniDialogAddComponent } from './mini-dialog-add.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    MiniDialogAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule
  ],
  exports: [
    MiniDialogAddComponent
  ],
  providers: [
    MessageService
  ]
})
export class MiniDialogModule { }
