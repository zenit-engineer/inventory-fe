import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { StatisticsComponent } from '../statistics/statistics.component';



// Define the routes in the application
const routes: Routes = [
  {
    path: 'home',
    component: ProductComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent
  }
  // Add additional routes here
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use RouterModule.forChild(routes) for feature modules
  exports: [RouterModule]
})
export class BaseModule { }
