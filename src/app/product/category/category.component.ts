import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  @ViewChild('categoryTable') categoryTable!: Table; // Reference to the p-table


  ngOnInit(): void {
    this.getAllCategories()
  }

  categories: string[] = [];
  
  
  getAllCategories(): void {
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
  }

  resetSorting(){
    this.categoryTable.clear();
  }

}
