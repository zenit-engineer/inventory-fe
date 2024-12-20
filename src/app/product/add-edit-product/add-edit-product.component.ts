import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.sass']
})
export class AddEditProductComponent implements OnInit{

  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  productForm = this.fb.group({
    title: ["", Validators.required],
    price: ["", Validators.required],
    description: [""],
    category: ["", Validators.required],
    image: ["", Validators.required]
  })

  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
  }

  closeModal(){
    this.clickClose.emit(true);
  } 

  addProduct(){

  }

}
