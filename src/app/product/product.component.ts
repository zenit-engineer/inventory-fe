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

  saveProductToList(newData: any){
    this.products.unshift(newData);
    //this.getProductList(); if i had been using real db not fake API
  }
  
  showEditModal(product: Product){
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }

}
