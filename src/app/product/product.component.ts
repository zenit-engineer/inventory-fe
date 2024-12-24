import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { catchError, first, map } from 'rxjs/operators';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnDestroy {

  products: Product[] = [];
  selectedProduct: Product | null = null; 
  displayAddEditModal = false;
  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();
  totalProducts: number = 0;

  request = {
    first: 0,
    rows: 10
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
    // Log the event to check the pagination details
    console.log($event);
    
    // Dynamically set the `first` and `rows` properties from the lazy load event
    this.request.first = $event.first || 0; // The starting index for the page
    this.request.rows = $event.rows || 10;  // Number of rows per page
  
    // Fetch products based on the updated pagination request
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
