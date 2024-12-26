import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { catchError, map, Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Product } from '../product';
import { ProductRequest } from 'src/app/interfaces/product-request';

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.css']
})
export class FilterProjectComponent implements OnInit, OnDestroy{

  products: Product[] = [];
  
  globalFilter = '';
  request: ProductRequest = {
    first: 0,
    rows: 10,
    sortField: '',
    sortOrder: 1,
    category: '', 
    supplier: '', 
    manufacturer: '', 
    searchText: ''
  }
  selectedCategory: string | null = null;
  selectedSupplier: string | null = null;
  selectedManufacturer: string | null = null;
  categories:string[] = ['sports','electronics','cosmetics','clothings','textil','metals','colors'];
  suppliers:string[] = ['Apple','Ali Baba','Amazon','Ali Express','Microsoft'];
  manufacturers:string[] = ['Adidas', 'Puma', 'Nike', 'La Coste'];

  @Output() selectCategory: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() selectSupplier: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() selectManufacturer: EventEmitter<string | null> = new EventEmitter<string | null>();
  
  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();
 
  @Input() table!: Table;
  @Output() searchChanged: EventEmitter<string| null> = new EventEmitter<string | null>();;

  constructor(private productService: ProductService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    return this.categories;
  }

  getAllProducts() {
    this.productSubscription = this.productService.getAllProducts(this.request).pipe(
      map(response => response.data.products),  // Extract the products array from the response
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
        this.products = products;  // Assign the products array to the component's products property
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
    

  onCategoryChange($event: any) {
    this.selectCategory.emit($event.value || null); // Emit null when the dropdown is cleared
  }

  onManufacturerChange($event: any) {
    this.selectManufacturer.emit($event.value || null); // Emit null when the dropdown is cleared
  }

  onSupplierChange($event: any) {
    this.selectSupplier.emit($event.value || null); // Emit null when the dropdown is cleared
  }

  

  searchProducts(searchedText: string) {
    this.searchChanged.emit(searchedText.trim());
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
