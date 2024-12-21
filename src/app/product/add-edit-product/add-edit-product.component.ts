import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit,OnChanges{

  @Input() displayAddEditModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedProduct: any = null;

  productForm = this.fb.group({
    title: ["", Validators.required],
    price: ["", Validators.required],
    description: [""],
    category: ["", Validators.required],
    image: ["", Validators.required]
  })

  constructor(
    private fb: FormBuilder, 
    private productService: ProductService,
    private messageService: MessageService
  ){

  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.selectedProduct){
      this.productForm.patchValue(this.selectedProduct); 
    } else {
      this.productForm.reset();
    }
  }

  closeModal(){
    this.clickClose.emit(true);
    this.productForm.reset();
  } 

  addProduct() {
    this.productService.saveProduct(this.productForm.value).subscribe(
      response => {
        this.clickAdd.emit(response);
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Errror occured');
      }
    )
  }

}
