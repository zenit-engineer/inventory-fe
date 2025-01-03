import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { catchError, map, of, Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Product } from '../../interfaces/product';
import { ProductRequest } from 'src/app/interfaces/product-request';
import { ApiResponseWithDataListOfStrings } from 'src/app/interfaces/api-response-with-data-list-of-strings';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.css']
})
export class FilterProjectComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  
  globalFilter = '';
  request: ProductRequest = {
    first: 0,
    rows: 10,
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

  @Output() selectCategory: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() selectSupplier: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() selectManufacturer: EventEmitter<string | null> = new EventEmitter<string | null>();
  
  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();
 
  @Input() table!: Table;
  @Output() searchChanged: EventEmitter<string| null> = new EventEmitter<string | null>();;

  constructor(private productService: ProductService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllManufacturers();
    this.getAllSuppliers();
  }

  getAllCategories(): void {
    this.productSubscription = this.productService.getAllCategories().pipe(
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
    this.subscriptions.push(this.productSubscription);
  }
  
  getAllManufacturers(): void {
    this.productSubscription = this.productService.getAllManufacturers().pipe(
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
    this.subscriptions.push(this.productSubscription);
  }
  
  getAllSuppliers(): void {
    this.productSubscription = this.productService.getAllSuppliers().pipe(
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
    this.subscriptions.push(this.productSubscription);
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
    this.productSubscription = this.productService.generateExcel().pipe(
      catchError(error => {
        console.error('Error generating Excel file:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to generate Excel file.'
        });
        return of(null);  // Return null to handle the error gracefully
      })
    ).subscribe({
      next: () => {
        // When the response is successful (no body expected), trigger the download
        const url = `${this.baseUrl}/api/v1/product/export-excel`; // Assuming backend sends the file directly
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.xls'; // Name of the file to be downloaded
        a.click();
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
  }  
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
