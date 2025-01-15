import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MiniDialogAddComponent } from '../mini-dialog-add/mini-dialog-add.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manufacturer',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ToastModule,
    MiniDialogAddComponent,
    RouterModule
  ],
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {

  @ViewChild('manufacturerTable') manufacturerTable!: Table; // Reference to the p-table
  manufacturers: string[] = [];
  isSorted: boolean | null = null; // Allowing null
  initialValue: string[] = [];
  visible: boolean = false;
  triggeredBy = '';
  subscriptions: Subscription[] = [];
  manufacturerSubscription: Subscription = new Subscription();

  constructor(private confirmationService: ConfirmationService,
    private productService: ProductService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllManufacturers();
  }

  getAllManufacturers(){
    this.manufacturers = JSON.parse(localStorage.getItem('manufacturers') || '[]');
    this.initialValue = [...this.manufacturers];
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
        this.manufacturers = [...this.initialValue];
        this.manufacturerTable.reset();
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

  deleteManufacturer(manufacturerName: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.manufacturerSubscription = this.productService.deleteManufacturer(manufacturerName).subscribe({
          next: (response) => {
            // Handle successful deletion
            if (response.status === 'OK') {
              this.removeManufacturer(manufacturerName);
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
                detail: error.message || 'There was an error deleting the manufacturer.'
              });
            }
          }
        });
  
        this.subscriptions.push(this.manufacturerSubscription);
      }
    });
  }
  
  removeManufacturer(manufacturerName: string): void {
    // Retrieve manufacturers from localStorage
    let manufacturers: string[] = JSON.parse(localStorage.getItem('manufacturers') || '[]');
  
    // Filter out the manufacturer to remove
    manufacturers = manufacturers.filter(name => name !== manufacturerName);
  
    // Save the updated list back to localStorage
    localStorage.setItem('manufacturers', JSON.stringify(manufacturers));

    this.manufacturers = [...manufacturers];

  }  

  closeDialog(): void {
    this.visible = false; // Hide the dialog
  }

  handleManufacturerName(name: string): void {
    if (name) {
      this.manufacturers.unshift(name); // Add to local list
      localStorage.setItem('manufacturers', JSON.stringify(this.manufacturers)); // Save
    }
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
