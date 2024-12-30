import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit{
  ngOnInit(): void {
    this.getAllSuppliers();
  }

  suppliers: string[] = [];

  getAllSuppliers(): void {
    this.suppliers = JSON.parse(localStorage.getItem('suppliers') || '[]');
  }

}
