import { Component } from '@angular/core';

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.scss']
})
export class ManufacturerComponent {

  manufacturers: string[] = ['Toyota','Tesla','BMW','Porche'];
  

}
