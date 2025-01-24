import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { catchError, map, of, Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductRequest } from 'src/app/interfaces/product-request';
import { ApiResponseWithDataListOfStrings } from 'src/app/interfaces/api-response-with-data-list-of-strings';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { ApiResponse } from 'src/app/interfaces/api-response';

@Component({
  selector: 'app-filter-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FileUploadModule,
    ToastModule,
    ToolbarModule,
    RouterModule  

  ],
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.scss']
})
export class FilterProjectComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  globalFilter = '';
  request: ProductRequest = {
    first: 0,
    rows: 15,
    sortField: '',
    sortOrder: 1,
    category: '', 
    supplier: '', 
    manufacturer: '', 
    searchText: ''
  }
  selectedCategory: string | null = null;
  selectedSupplier: string | null = null;
  selectedManufacturer: string | null = null;
  categories:string[] = [];
  suppliers:string[] = [];
  manufacturers:string[] = [];
  baseUrl: string = environment.backend_url;
  selectedProducts!: Product[] | null;
  @Output() selectCategory: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() selectSupplier: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() selectManufacturer: EventEmitter<string | null> = new EventEmitter<string | null>();
  subscriptions: Subscription[] = [];
  filterSubscription: Subscription = new Subscription();
  @Input() selectedProductIds: number[] = [];
  @Input() table!: Table;
  @Output() searchChanged: EventEmitter<string| null> = new EventEmitter<string | null>();;
  totalProducts: number = 0;

  constructor(private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllManufacturers();
    this.getAllSuppliers();
  }

  getAllCategories(): void {
    this.filterSubscription = this.productService.getAllCategories().pipe(
      map((response: ApiResponseWithDataListOfStrings) => response.data), // Directly use the `data` field as it is already a string array
      catchError(error => {
        console.error('Error fetching categories:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load categories.'
        });
        return []; // Return an empty array in case of error
      })
    ).subscribe({
      next: (categoriesNames: string[]) => {
        this.categories = categoriesNames; // Assign the string array to `manufacturers`
        localStorage.setItem('categories', JSON.stringify(this.categories));
      },
      error: (error) => {
        console.error('Error during category fetch:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Error occurred while fetching categories.'
        });
      }
    });
    
    // Add the subscription to the subscriptions array for proper management
    this.subscriptions.push(this.filterSubscription);
  }
  
  getAllManufacturers(): void {
    this.filterSubscription = this.productService.getAllManufacturers().pipe(
      map((response: ApiResponseWithDataListOfStrings) => response.data), // Directly use the `data` field as it is already a string array
      catchError(error => {
        console.error('Error fetching manufacturers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load manufacturers.'
        });
        return []; // Return an empty array in case of error
      })
    ).subscribe({
      next: (manufacturerNames: string[]) => {
        this.manufacturers = manufacturerNames; // Assign the string array to `manufacturers`
        localStorage.setItem('manufacturers', JSON.stringify(this.manufacturers));
      },
      error: (error) => {
        console.error('Error during manufacturer fetch:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Error occurred while fetching manufacturers.'
        });
      }
    });
  
    // Add the subscription to the subscriptions array for proper management
    this.subscriptions.push(this.filterSubscription);
  }
  
  getAllSuppliers(): void {
    this.filterSubscription = this.productService.getAllSuppliers().pipe(
      map((response: ApiResponseWithDataListOfStrings) => response.data), // Directly use the `data` field as it is already a string array
      catchError(error => {
        console.error('Error fetching suppliers:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load suppliers.'
        });
        return []; // Return an empty array in case of error
      })
    ).subscribe({
      next: (supplierNames: string[]) => {
        this.suppliers = supplierNames; // Assign the string array to `manufacturers`
        localStorage.setItem('suppliers', JSON.stringify(this.suppliers));
      },
      error: (error) => {
        console.error('Error during supplier fetch:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Error occurred while fetching suppliers.'
        });
      }
    });
  
    // Add the subscription to the subscriptions array for proper management
    this.subscriptions.push(this.filterSubscription);
  }
    
  onCategoryChange($event: any) {
    this.selectCategory.emit($event.value || null); // Emit null when the dropdown is cleared
  }

  onManufacturerChange($event: any) {
    this.selectManufacturer.emit($event.value || null); // Emit null when the dropdown is cleared
  }

  onSupplierChange($event: any) {
    this.selectSupplier.emit($event.value || null); // Emit null when the dropdown is cleared
  }

  searchProducts(searchedText: string) {
    this.searchChanged.emit(searchedText.trim());
  }

  generateExcel(): void {
  // Subscribe to the productService generateExcel API
  this.filterSubscription = this.productService.generateExcel()
    .subscribe({
      next: (response: Blob) => {
        // When the response is successful (the file is returned as a Blob), trigger the download
        const url = window.URL.createObjectURL(response);  // Create a URL for the Blob response
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.xls';  // Set the name for the file to be downloaded
        a.click();  // Trigger the download
        window.URL.revokeObjectURL(url);  // Clean up the URL object after download
      },
      error: (error) => {
        console.error('Error during Excel file fetch:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Error occurred while generating the Excel file.'
        });
      }
    });
    this.subscriptions.push(this.filterSubscription);
  }

  canDelete(): boolean {
    return this.selectedProductIds && this.selectedProductIds.length > 0; // Check if there are any selected items
  }

  getAllProducts() {
    this.filterSubscription = this.productService.getAllProducts(this.request).pipe(
      map(response => {
        const responseData = response.data;
        this.totalProducts = responseData?.totalElements || 0; // Extract totalElements
        return responseData?.products || []; // Extract products list
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products.'
        });
        return []; // Return empty array in case of error
      })
    ).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error during product fetch:', error);
      }
    });
  
    this.subscriptions.push(this.filterSubscription);
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Check if there are selected products to delete
        if (this.selectedProductIds && this.selectedProductIds.length > 0) {
          // Call the product service to delete multiple products
          this.filterSubscription = this.productService.deleteMultipleProducts(this.selectedProductIds)
            .subscribe({
              next: (response: ApiResponse) => {
                // Assuming ApiResponse has properties like status, message, etc.
                if (response.status === 'success') {
                  // Handle success (e.g., refresh product list, show success message)
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Products Deleted',
                    life: 3000
                  });
                  // Perform any UI updates, such as refreshing the table or clearing the selection
                  this.selectedProductIds = []; // Clear the selected IDs
                  this.getAllProducts(); // Refresh the product list (assuming this method exists)
                } else {
                  // Handle unexpected response status
                  this.messageService.add({
                    severity: 'warn',
                    summary: 'Warning',
                    detail: response.message || 'Unable to delete products.',
                  });
                }
              },
              error: (error) => {
                console.error('Error during product deletion:', error);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: error.message || 'An error occurred while deleting products.',
                });
              }
            });
  
          // Push the subscription to the subscriptions array
          this.subscriptions.push(this.filterSubscription);
        } else {
          // Handle the case where no products are selected
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail: 'No products selected for deletion.',
          });
        }
      }
    });
  }
  
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
