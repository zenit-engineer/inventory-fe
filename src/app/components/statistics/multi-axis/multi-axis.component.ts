import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-multi-axis',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './multi-axis.component.html',
  styleUrls: ['./multi-axis.component.scss']
})
export class MultiAxisComponent {
  data: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'Dataset 1',
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  yAxisID: 'y',
                  tension: 0.4,
                  data: [65, 59, 80, 81, 56, 55, 10]
              },
              {
                  label: 'Dataset 2',
                  fill: false,
                  borderColor: documentStyle.getPropertyValue('--green-500'),
                  yAxisID: 'y1',
                  tension: 0.4,
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };
      
      this.options = {
          stacked: false,
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder
                  }
              },
              y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder
                  }
              },
              y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      drawOnChartArea: false,
                      color: surfaceBorder
                  }
              }
          }
      };
  }
}
