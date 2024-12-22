import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';  // Correctly importing catchError and map


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit, OnDestroy{
  
  products: Product[] = [];
  selectedProduct: any = null;
  displayAddEditModal = false;
  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}
  
  ngOnInit(): void {
    this.getAllProducts();
  }

  showAddModal(){
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  showEditModal(product: Product){
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }

  hideAddModal(isClosed: boolean){
    this.displayAddEditModal = !isClosed;
  }

  getAllProducts(): void {
    this.productSubscription = this.productService.getAllProducts().pipe(
      map(response => response.data),  
      catchError(error => {
        console.error('Error fetching products:', error);
        return [];  
      })
    ).subscribe(
      products => {
        this.products = products;}
    );
    this.subscriptions.push(this.productSubscription)
  }

  deleteProduct(productId: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {  
        this.productSubscription = this.productService.deleteProduct(productId).subscribe(
          response => {
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
          error => {
            console.error('Error deleting product:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message || 'There was an error deleting the product.'
            });
          }
        );
        this.subscriptions.push(this.productSubscription);
      }
    });
  }

  saveEditProductToList(newData: any){
    if(this.selectedProduct && newData.id === this.selectedProduct.id){
      const productIndex = this.products.findIndex(data => data.id === newData.id);
      this.products[productIndex] = newData;
    }else{
      this.products.unshift(newData);
    }

    this.getAllProducts();// while I'm using real database

  }

  getProductsByCategory(category: string){
    this.getProductListByCategory(category);
  }
  getProductListByCategory(category: string) {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
}
