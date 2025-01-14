import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit{

  @ViewChild('supplierTable') supplierTable!: Table; // Reference to the p-table
  suppliers: string[] = [];
  isSorted: boolean | null = null; // Allowing null
  initialValue: string[] = [];
  visible: boolean = false;
  triggeredBy = '';
  subscriptions: Subscription[] = [];
  supplierSubscription: Subscription = new Subscription();
  
  constructor(private confirmationService: ConfirmationService,
    private productService: ProductService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
    this.initialValue = [...this.suppliers];
  }


  customSort(event: SortEvent) {
      if (this.isSorted == null || this.isSorted === undefined) {
          this.isSorted = true;
          this.sortTableData(event);
      } else if (this.isSorted == true) {
          this.isSorted = false;
          this.sortTableData(event);
      } else if (this.isSorted == false) {
          this.isSorted = null;
          this.suppliers = [...this.initialValue];
          this.supplierTable.reset();
      }
    }
  
  sortTableData(event: SortEvent) {
    const data = event.data as string[]; // Cast event.data to string array
    data.sort((data1, data2) => {
        let value1 = data1;
        let value2 = data2;
        let result = null;
        
        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        // Provide a fallback value of 1 if event.order is undefined
        return (event.order || 1) * result; // Default to 1 if order is undefined
    });
  }

  showDialog(button: string): void {
    this.triggeredBy = button; // Save the button identifier
    this.visible = true;
  }

  closeDialog(): void {
    this.visible = false; // Hide the dialog
  }

  deleteSupplier(supplierName: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this supplier?',
      accept: () => {
        this.supplierSubscription = this.productService.deleteSupplier(supplierName).subscribe({
          next: (response) => {
            // Handle successful deletion
            if (response.status === 'OK') {
              this.removeSupplier(supplierName);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.message || 'Deleted Successfully'
              });
            }
          },
          error: (error) => {
            if (error.status === 400) {
              this.messageService.add({
                severity: 'error',
                summary: 'Bad Request',
                detail: error.error?.message || 'Something went wrong!'
              });
            } else {
              // General error handling
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'There was an error deleting the supplier.'
              });
            }
          }
        });
  
        this.subscriptions.push(this.supplierSubscription);
      }
    });
  }

  removeSupplier(supplierName: string): void {
    // Retrieve suppliers from localStorage
    let suppliers: string[] = JSON.parse(localStorage.getItem('suppliers') || '[]');
  
    // Filter out the supplier to remove
    suppliers = suppliers.filter(name => name !== supplierName);
  
    // Save the updated list back to localStorage
    localStorage.setItem('suppliers', JSON.stringify(suppliers));

    this.suppliers = [...suppliers];

  } 

  handleSupplierName(name: string): void {
    if (name) {
      this.suppliers.unshift(name); // Add to local list
      localStorage.setItem('suppliers', JSON.stringify(this.suppliers)); // Save
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
