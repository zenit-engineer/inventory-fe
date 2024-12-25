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
    sortOrder: 1
  }
  selectedCategory: string | null = null;
  categories:string[] = ['sports','electronics','cosmetics','clothings','textil','metals','colors'];
  @Output() selectCategory: EventEmitter<string | null> = new EventEmitter<string | null>();
  
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
    

  onDropdownChange($event: any) {
    this.selectCategory.emit($event.value); // Emit null when the dropdown is cleared
  }
  
  searchProducts(searchedText: string) {
    this.searchChanged.emit(searchedText);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
