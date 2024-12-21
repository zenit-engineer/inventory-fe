import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit, OnDestroy{
  
  products: Product[] = [];
  displayAddEditModal = false;
  selectedProduct: any = null;
  subscriptions: Subscription[] = [];
  productSubscribtion: Subscription = new Subscription();

  constructor(private productService: ProductService, private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}
  
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.productSubscribtion = this.productService.getProducts().subscribe(
      response => {
        this.products = response;
        console.log(this.products);
      }
    )
    this.subscriptions.push(this.productSubscribtion)
  }

  showAddModal(){
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed: boolean){
    this.displayAddEditModal = !isClosed;
  }

  saveEditProductToList(newData: any){
    if(this.selectedProduct && newData.id === this.selectedProduct.id){
      const productIndex = this.products.findIndex(data => data.id === newData.id);
      this.products[productIndex] = newData;
    }else{
      this.products.unshift(newData);
    }

    //this.getProductList(); if i had been using real db not fake API (usage only this line)

  }
  
  showEditModal(product: Product){
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }

  deleteProduct(product: Product){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      accept: () => {  
        this.productSubscribtion = this.productService.deleteProduct(product.id).subscribe(
          response => {
            //this.getProductList() if we used real database 
            this.products = this.products.filter(data => data.id !== product.id);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Success', detail: error });
          }
        );
        this.subscriptions.push(this.productSubscribtion);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
}
