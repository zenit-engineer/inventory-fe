import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { ApiResponseWithDataListOfStrings } from 'src/app/interfaces/api-response-with-data-list-of-strings';
import { Manufacturer } from 'src/app/interfaces/manufacturer';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-mini-dialog-add',
  templateUrl: './mini-dialog-add.component.html',
  styleUrls: ['./mini-dialog-add.component.sass']
})
export class MiniDialogAddComponent {

  modalType = "Add";
  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() triggeredBy: string = '';
  subscriptions: Subscription[] = [];
  miniDialogSubscription: Subscription = new Subscription();

  addForm = this.fb.group({
      name: ["", Validators.required],
    })

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ){}

  closeModal(){
    this.clickClose.emit(true);
    this.addForm.reset();
  } 

  addToDatabase() {
    const manufacturerData: Manufacturer = {
      name: this.addForm.value.name ?? '', // Fallback to empty string
    };
  
    // Call the appropriate method based on `triggeredBy`
    switch (this.triggeredBy) {
      case 'manufacturer':
        this.addManufacturer(manufacturerData);
        break;
      case 'supplier':
        this.addSupplier(manufacturerData);
        break;
      case 'category':
        this.addCategory(manufacturerData);
        break;
      default:
        alert('Invalid action!');
    }
  }
  
  private addManufacturer(data: Manufacturer): void {
    this.productService.addNewManufacturer(data).subscribe({
      next: (response: ApiResponseWithDataListOfStrings) => {
        if (response?.status === 'CREATED') {
          this.showToast('success', 'Success', response?.message || 'Manufacturer added successfully');
          let manufacturers = this.productService.getAllManufacturers();
          localStorage.setItem('manufacturers', JSON.stringify(manufacturers));
          this.closeModal();
        } else {
          this.showToast('error', 'Error', `Unexpected response status: ${response?.status || 'unknown'}`);
        }
      },
      error: (err: any) => {
        this.showToast('error', 'Error', `Failed to add manufacturer: ${err.message}`);
      },
    });
  }

  private addSupplier(data: Manufacturer): void {
    this.productService.addNewSupplier(data).subscribe({
      next: (response: ApiResponseWithDataListOfStrings) => {
        if (response?.status === 'CREATED') {
          this.showToast('success', 'Success', response?.message || 'Supplier added successfully');
          let suppliers = this.productService.getAllSuppliers();
          localStorage.setItem('suppliers', JSON.stringify(suppliers));
          this.closeModal();
        } else {
          this.showToast('error', 'Error', `Unexpected response status: ${response?.status || 'unknown'}`);
        }
      },
      error: (err: any) => {
        this.showToast('error', 'Error', `Failed to add supplier: ${err.message}`);
      },
    });
  }
  
  private addCategory(data: Manufacturer): void {
    this.productService.addNewCategory(data).subscribe({
      next: (response: ApiResponseWithDataListOfStrings) => {
        if (response?.status === 'CREATED') {
          this.showToast('success', 'Success', response?.message || 'Category added successfully');
          let categories = this.productService.getAllCategories();
          localStorage.setItem('categories', JSON.stringify(categories));
          this.closeModal();
        } else {
          this.showToast('error', 'Error', `Unexpected response status: ${response?.status || 'unknown'}`);
        }
      },
      error: (err: any) => {
        this.showToast('error', 'Error', `Failed to add category: ${err.message}`);
      },
    });
  }
  // Toast utility method
  private showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }

}
