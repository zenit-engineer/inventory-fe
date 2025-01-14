import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { StatisticsComponent } from './statistics.component';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { MultiAxisComponent } from './multi-axis/multi-axis.component';


@NgModule({
  declarations: [StatisticsComponent, VerticalBarComponent, MultiAxisComponent],
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule
  ]
})
export class StatisticsModule { }
