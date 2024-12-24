import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { Product } from '../product';
import { catchError, Subscription } from 'rxjs';
import { FileUploadEvent } from 'primeng/fileupload';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit, OnChanges, OnDestroy{

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";

  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();

  selectedCategory: string | null = null;
  categories:string[] = ['sports','electronics','cosmetics','clothings','textil','metals','colors'];
  @Output() selectCategory: EventEmitter<string | null> = new EventEmitter<string | null>();

  productForm = this.fb.group({
    title: ["", Validators.required],
    price: ["", Validators.required],
    description: ["", Validators.required],
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
    this.getCategories();
  }

  ngOnChanges(): void {
    if(this.selectedProduct){
      this.productForm.patchValue(this.selectedProduct); 
      this.modalType = 'Edit';
    } else {
      this.productForm.reset();
      this.modalType = 'Add';
    }
  }

  closeModal(){
    this.clickClose.emit(true);
    this.productForm.reset();
  } 

  addEditProduct() {
    const productData: Product = {
      id: this.selectedProduct?.id || null,
      title: this.productForm.value.title ?? '',  // Fallback to an empty string if null or undefined
      price: parseFloat(this.productForm.value.price ?? "0") || 0,
      description: this.productForm.value.description ?? '',  // Fallback to an empty string if null or undefined
      category: this.productForm.value.category ?? '',  // Fallback to an empty string if null or undefined
      image: this.productForm.value.image ?? '',  // Fallback to an empty string if null or undefined
      rating: this.selectedProduct?.rating ?? 0 // Fallback to 0 if rating is undefined
    };
    
    // Check if it's an update or add operation
    if (productData.id) {
      this.updateProduct(productData);
    } else {
      this.addProduct(productData);
    }
  }  
  
  updateProduct(productData: Product): void {
    this.productSubscription = this.productService.updateProduct(productData).pipe(
      catchError(error => {
        console.error('Error updating product:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'There was an error updating the product.'
        });
        return [];  // Prevent breaking the flow by returning an empty observable
      })
    ).subscribe({
      next: (response) => {
        this.clickAddEdit.emit(response);
        this.closeModal();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message || 'Product updated successfully!'
        });
      },
      error: (error) => {
        console.error('Error occurred while updating product:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'There was an error updating the product.'
        });
      }
    });
  
    this.subscriptions.push(this.productSubscription);
  }
  
  
  addProduct(productData: Product): void {
    this.productSubscription = this.productService.addProduct(productData).pipe(
      catchError(error => {
        console.error('Error adding product:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'There was an error adding the product.'
        });
        return [];  // Prevent breaking the flow by returning an empty observable
      })
    ).subscribe({
      next: (response) => {
        this.clickAddEdit.emit(response);
        this.closeModal();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message || 'Product added successfully!'
        });
      },
      error: (error) => {
        console.error('Error occurred while adding product:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'There was an error adding the product.'
        });
      }
    });
  
    this.subscriptions.push(this.productSubscription);
  }
  
  
  getCategories(): void {
    this.categories;
  }
  
  onImageUpload(event: any) {
    const file = event.files[0]; // Retrieve the uploaded file
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64Image = (reader.result as string).split(',')[1]; // Remove the prefix
      this.productForm.patchValue({
        image: base64Image, // Store only the base64 string
      });
    };
  
    if (file) {
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  }
  

  onChangeCategory($event: any){
    this.selectCategory.emit($event.value);
  }

  onDropdownChange(value: string | null): void {
    this.selectedCategory = value;
    this.selectCategory.emit(value); // Emit null when the dropdown is cleared
  } 

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
