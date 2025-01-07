import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { StatisticsComponent } from './statistics.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule
  ]
})
export class StatisticsModule { }
