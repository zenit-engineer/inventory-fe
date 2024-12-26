import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { ProductRequest } from '../interfaces/product-request';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnDestroy {

  products: Product[] = [];
  selectedProduct: Product | null = null; 
  displayAddEditModal = false;
  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();
  totalProducts: number = 0;

  isSortingApplied: boolean = false; // Initial state
  @ViewChild('productTable') productTable!: Table; // Reference to the p-table

  request: ProductRequest = {
    first: 0,
    rows: 10,
    sortField: '',
    sortOrder: 1,
    category: '' , 
    supplier: '', 
    manufacturer: '', 
    searchText: '' 
  }

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  showEditModal(product: Product) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  deleteProduct(productId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {
        this.productSubscription = this.productService.deleteProduct(productId).subscribe({
          next: (response) => {
            if (response.status === 'OK') {
              this.getAllProducts(); 
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.message || 'Deleted Successfully'
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: response.message || 'Something went wrong!'
              });
            }
          },
          error: (error) => {
            console.error('Error deleting product:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message || 'There was an error deleting the product.'
            });
          }
        });
        this.subscriptions.push(this.productSubscription);
      }
    });
  }  

  saveEditProduct(newData: any): void {
    const productData = newData.data;
    if (this.selectedProduct && productData.id === this.selectedProduct.id) {
      this.editProduct(productData);
    } else {

      this.saveProduct();
    }
    this.selectedProduct = null;
  }
  
  editProduct(updatedProduct: Product): void {
    const productIndex = this.products.findIndex(product => product.id === updatedProduct.id);
    if (productIndex !== -1) {
      this.products[productIndex] = updatedProduct;
    }
  }
  
  saveProduct(): void {
    this.getAllProducts();
  }  
  
  getProductsByCategory(category: string | null){
    if(category === null || category === undefined){
      this.productTable.clear();
    } else{
      this.productSubscription = this.productService.getProductsByCategory(category).pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error fetching products:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load products.'
          });
          return []; // Return an empty array in case of error to prevent breaking the flow
        })
      ).subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error) => {
          console.error('Error during product fetch:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Error occurred while fetching products.'
          });
        }
      });
      this.subscriptions.push(this.productSubscription);
    }    
  }

  onFilterChange(filterType: string, value: string | null) {
    // Update the corresponding request field based on filter type
    if (filterType === 'category') {
      this.request.category = value; // Update category filter
    } else if (filterType === 'search') {
      this.request.searchText = value; // Update search text
    }  
  
    // Reset pagination to the first page when a filter changes
    this.request.first = 0;
  
    // Fetch products with the updated filters
    this.getAllProducts();
  }
  
  getAllProducts() {

    this.productSubscription = this.productService.getAllProducts(this.request).pipe(
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
  
    this.subscriptions.push(this.productSubscription);
  }
  
  loadProducts($event: TableLazyLoadEvent) {
    
    // Dynamically set the `first` and `rows` properties from the lazy load event
    this.request.sortField = $event.sortField || '';
    this.request.sortOrder = $event.sortOrder || 1;
    this.request.first = $event.first || 0; // The starting index for the page
    this.request.rows = $event.rows || 10;  // Number of rows per page
  
    // Check if sorting is applied
    this.isSortingApplied = !!$event.sortField;

    // Fetch products based on the updated pagination request
    this.getAllProducts();
  }

  resetSorting() {
    this.request.sortField = ''; // Clear the sort field
    this.request.sortOrder = 1; // Reset to ascending or default
    this.request.first = 0; // Reset pagination to the first page
  
    this.isSortingApplied = false; // Indicate no sorting is applied
    
    if (this.productTable) {
      this.productTable.clear();
    }

    this.getAllProducts();
  }  

  searchProduct(searchText: string | null) {
    if(searchText === null || searchText === undefined){
      this.productTable.clear();
    }
    this.productSubscription = this.productService.searchProduct(searchText).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error fetching products:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load products.'
        });
        return []; // Return an empty array in case of error to prevent breaking the flow
      })
    ).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        console.error('Error during product fetch:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Error occurred while fetching products.'
        });
      }
    });
  
    this.subscriptions.push(this.productSubscription); // Ensure to add subscription to the array for unsubscription
  }    

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
