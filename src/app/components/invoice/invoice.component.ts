import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    CommonModule,
    InputNumberModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    DatePicker
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  constructor(
    private fb: FormBuilder, 
  ){}
  categories:string[] = [];
  suppliers:string[] = [];
  manufacturers:string[] = [];
  productForm = this.fb.group({
    invoiceNumber: ["", Validators.required],
    billingCompany: ["", Validators.required],
    billingName: ["", Validators.required],
    billingAddress: ["", Validators.required],
    billingEmail: ["", Validators.required],
    shippingAddress: ["", Validators.required],
    shippingName: ["", Validators.required],
  })
}
