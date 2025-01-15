import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { VerticalBarComponent } from "./vertical-bar/vertical-bar.component";
import { MultiAxisComponent } from "./multi-axis/multi-axis.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-statistics',
    standalone: true,
    imports: [
        CommonModule,
        ChartModule,
        ButtonModule,
        VerticalBarComponent,
        MultiAxisComponent,
        RouterModule
    ],
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
}
