import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit{
  
  products: Product[] = [];
  displayAddEditModal = false;
  selectedProduct: any = null;

  constructor(private productService: ProductService){}
  
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.productService.getProducts().subscribe(
      response => {
        this.products = response;
        console.log(this.products);
      }
    )
  }

  showAddModal(){
    this.displayAddEditModal = true;
    this.selectedProduct = null;
  }

  hideAddModal(isClosed: boolean){
    this.displayAddEditModal = !isClosed;
  }

  saveEditProductToList(newData: any){
    if(newData.id === this.selectedProduct.id){
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

}
