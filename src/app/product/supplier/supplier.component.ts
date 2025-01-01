import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit{

  @ViewChild('supplierTable') supplierTable!: Table; // Reference to the p-table

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  suppliers: string[] = [];

  getAllSuppliers(): void {
    this.suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
  }

  resetSorting(){
    this.supplierTable.clear();
  }

}
