import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  selectedProduct: Product | null = null; 
  displayAddEditModal = false;
  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

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

  getAllProducts() {
    this.productSubscription = this.productService.getAllProducts().pipe(
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
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
