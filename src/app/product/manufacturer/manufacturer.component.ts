import { Component, OnInit, ViewChild } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent implements OnInit {

  @ViewChild('manufacturerTable') manufacturerTable!: Table; // Reference to the p-table
  manufacturers: string[] = [];
  isSorted: boolean | null = null; // Allowing null
  initialValue: string[] = [];
  visible: boolean = false;
  triggeredBy = '';

  ngOnInit(): void {
    this.manufacturers = JSON.parse(localStorage.getItem('manufacturers') || '[]');
    this.initialValue = [...this.manufacturers];
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
        this.manufacturers = [...this.initialValue];
        this.manufacturerTable.reset();
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

}
