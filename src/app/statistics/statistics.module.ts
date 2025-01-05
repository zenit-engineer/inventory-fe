import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { StatisticsComponent } from './statistics.component';



@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    ChartModule
  ]
})
export class StatisticsModule { }
