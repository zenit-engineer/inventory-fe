import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit{

  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

  productForm = this.fb.group({
    title: ["", Validators.required],
    price: ["", Validators.required],
    description: [""],
    category: ["", Validators.required],
    image: ["", Validators.required]
  })

  constructor(private fb: FormBuilder, private productService: ProductService){

  }

  ngOnInit(): void {
  }

  closeModal(){
    this.clickClose.emit(true);
    this.productForm.reset();
  } 

  addProduct() {
    this.productService.saveProduct(this.productForm.value).subscribe(
      response => {
        this.clickAdd.emit(response);
        this.productForm.reset();
        this.closeModal();
      }
    )
  }

}
