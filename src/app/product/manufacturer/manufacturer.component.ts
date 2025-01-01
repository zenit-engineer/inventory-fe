import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { ManufacturerRequest } from 'src/app/interfaces/manufacturer-request';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {

  // Total number of manufacturers for pagination
  // totalProducts: number = 0;
  @ViewChild('manufacturerTable') manufacturerTable!: Table; // Reference to the p-table

  // // Request object to manage pagination and sorting
  // request: ManufacturerRequest = {
  //   first: 0,
  //   rows: 5,
  //   sortField: '', // Default sort field
  //   sortOrder: -1 // Default sortOrder to descending
  // };

  // Manufacturers to display in the table
  manufacturers: string[] = [];

  ngOnInit(): void {
    // Load initial data with a simulated event
    // const initialEvent: TableLazyLoadEvent = {
    //   first: this.request.first,
    //   rows: this.request.rows,
    //   sortField: this.request.sortField,
    //   sortOrder: this.request.sortOrder
    // };

    // this.getAllManufacturers(initialEvent);
    this.manufacturers = JSON.parse(localStorage.getItem('manufacturers') || '[]');
  }

  // getAllManufacturers($event: TableLazyLoadEvent): void {
  //   // Update request object based on the event
  //   this.request.first = $event.first || 0;
  //   this.request.rows = $event.rows || 5;
  //   this.request.sortField = $event.sortField || 'manufacturer'; // Default sort by name
  //   this.request.sortOrder = $event.sortOrder || -1; // Default to descending order
  
  //   // Retrieve manufacturers from localStorage
  //   const allManufacturers: string[] = JSON.parse(localStorage.getItem('manufacturers') || '[]');
  
  //   // Update total products for pagination
  //   this.totalProducts = allManufacturers.length;
  
  //   // If no sort is applied (initial load), reverse the order (last element to first)
  //   let sortedManufacturers: string[] = [...allManufacturers];
  
  //   if (!this.request.sortField) {
  //     // Default to reverse order (last element to first)
  //     sortedManufacturers = sortedManufacturers.reverse();
  //   } else {
  //     // Sort by manufacturer name when sorting is triggered
  //     sortedManufacturers = [...allManufacturers].sort((a, b) => {
  //       if (this.request.sortOrder === 1) {
  //         return a.localeCompare(b); // Ascending by manufacturer name
  //       } else {
  //         return b.localeCompare(a); // Descending by manufacturer name
  //       }
  //     });
  //   }
  
  //   // Apply Pagination
  //   this.manufacturers = sortedManufacturers.slice(
  //     this.request.first,
  //     this.request.first + this.request.rows
  //   );
  // }
  

  // Method to reset sorting
  resetSorting(): void {
    // this.getAllManufacturers(initialEvent);
    this.manufacturerTable.clear(); // Clears the UI state
  }
}
