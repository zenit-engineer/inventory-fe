import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @ViewChild('categoryTable') categoryTable!: Table; // Reference to the p-table
  categories: string[] = [];
  isSorted: boolean | null = null; // Allowing null
  initialValue: string[] = [];
  visible: boolean = false;
  triggeredBy = '';
  subscriptions: Subscription[] = [];
  categorySubscription: Subscription = new Subscription();

  constructor(private confirmationService: ConfirmationService,
    private productService: ProductService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(): void {
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
    this.initialValue = [...this.categories];
  }

  customSort(event: SortEvent) {
      if (this.isSorted == null || this.isSorted === undefined) {
          this.isSorted = true;
          this.sortTableData(event);
      } else if (this.isSorted == true) {
          this.isSorted = false;
          this.sortTableData(event);
      } else if (this.isSorted == false) {
          this.isSorted = null;
          this.categories = [...this.initialValue];
          this.categoryTable.reset();
      }
    }
  
  sortTableData(event: SortEvent) {
    const data = event.data as string[]; // Cast event.data to string array
    data.sort((data1, data2) => {
        let value1 = data1;
        let value2 = data2;
        let result = null;
        
        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        // Provide a fallback value of 1 if event.order is undefined
        return (event.order || 1) * result; // Default to 1 if order is undefined
    });
  }

  showDialog(button: string): void {
    this.triggeredBy = button; // Save the button identifier
    this.visible = true;
  }

  closeDialog(): void {
    this.visible = false; // Hide the dialog
  }

  deleteCategory(categoryName: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      accept: () => {
        this.categorySubscription = this.productService.deleteCategory(categoryName).subscribe({
          next: (response) => {
            // Handle successful deletion
            if (response.status === 'OK') {
              this.removeCategory(categoryName);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.message || 'Deleted Successfully'
              });
            }
          },
          error: (error) => {
            if (error.status === 400) {
              this.messageService.add({
                severity: 'error',
                summary: 'Bad Request',
                detail: error.error?.message || 'Something went wrong!'
              });
            } else {
              // General error handling
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.message || 'There was an error deleting the category.'
              });
            }
          }
        });
  
        this.subscriptions.push(this.categorySubscription);
      }
    });
  }

  removeCategory(categoryName: string): void {
    // Retrieve categories from localStorage
    let categories: string[] = JSON.parse(localStorage.getItem('categories') || '[]');
  
    // Filter out the category to remove
    categories = categories.filter(name => name !== categoryName);
  
    // Save the updated list back to localStorage
    localStorage.setItem('categories', JSON.stringify(categories));

    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');

  } 

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
