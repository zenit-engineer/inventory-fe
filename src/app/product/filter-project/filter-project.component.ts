import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { catchError, map, Subscription } from 'rxjs';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { Product } from '../product';

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.css']
})
export class FilterProjectComponent implements OnInit, OnDestroy{

  products: Product[] = [];

  selectedCategory: string | null = null;
  categories:string[] = ['sports','electronics','clothin','cosmetics'];
  @Output() selectCategory: EventEmitter<string | null> = new EventEmitter<string | null>();
  
  subscriptions: Subscription[] = [];
  productSubscription: Subscription = new Subscription();
 
  @ViewChild('search') searchInput!: ElementRef;
  @ViewChild(Table) dt1!: Table;

  constructor(private productService: ProductService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    return this.categories;
  }

  searchProduct(){
    console.log('test');
  }

  clearSearch() {
    if (this.searchInput) {
      this.searchInput.nativeElement.value = '';
    }
    if (this.dt1) {
      this.dt1.filterGlobal('', 'contains');
    }
    this.getAllProducts();
  }

   getAllProducts() {
      this.productSubscription = this.productService.getAllProducts().pipe(
        map(response => response.data),
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
          this.products = products;
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

    searchPatient(category: string) {
      this.productSubscription = this.productService.searchProduct(category).pipe(
        map(response => response.data),
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
          this.products = products;
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
    
      this.subscriptions.push(this.productSubscription); // Ensure to add subscription to the array for unsubscription
    }    
    

    onDropdownChange(value: string | null): void {
      this.selectedCategory = value;
      this.selectCategory.emit(value); // Emit null when the dropdown is cleared
    }    

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
