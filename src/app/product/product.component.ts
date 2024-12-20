import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit{
  
  constructor(private productService: ProductService){}
  
  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this.productService.getProducts().subscribe(
      response => {
        console.log(response)
      }
    )
  }

}
