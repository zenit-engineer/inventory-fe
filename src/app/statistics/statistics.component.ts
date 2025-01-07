import { Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, map, of, Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { MessageService } from 'primeng/api';
import { VerticalBarData, VerticalBarResponseData } from '../interfaces/vertical-bar-response-data';
import { Chart } from 'chart.js';
import { UIChart } from 'primeng/chart';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

    basicData: any;
    subscriptions: Subscription[] = [];
    statisticsSubscription: Subscription = new Subscription();
    verticalBarData: VerticalBarData []= [];
    basicOptions: any;
    @ViewChild('chart') chart!: UIChart; // Reference to the PrimeNG chart

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
    ) { }

    ngOnInit() {    
        // Call the API and handle the data inside subscribe
        this.getVerticalBarData(2025);
    }
    
    getVerticalBarData(year: number) {
        this.statisticsSubscription = this.productService.getVerticalBarData(year).pipe(
            map((response: VerticalBarResponseData) => response.data), // Extract the array from `data`
            catchError(error => {
                console.error('Error fetching vertical bar data:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load vertical bar data.'
                });
                return of([] as VerticalBarData[]); // Return an empty array on error
            })
        ).subscribe({
            next: (verticalBarData) => {
                this.verticalBarData = verticalBarData; // Assign the extracted data
    
                // Map the data to totalPrices and initialize the chart
                const totalPrices: number[] = this.verticalBarData.map(item => item.total_price);
    
                // Update the chart data
                this.initializeChart(totalPrices);
            },
            error: (error) => {
                console.error('Error during vertical bar data fetch:', error);
            }
        });
    
        this.subscriptions.push(this.statisticsSubscription);
    }
    
    initializeChart(totalPrices: number[]) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        this.basicData = {
            labels: months,
            datasets: [
                {
                    label: 'All prices per month',
                    data: totalPrices,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.2)', 
                        'rgba(75, 192, 192, 0.2)', 
                        'rgba(54, 162, 235, 0.2)', 
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 159, 64)', 
                        'rgb(75, 192, 192)', 
                        'rgb(54, 162, 235)', 
                        'rgb(153, 102, 255)'
                    ],
                    borderWidth: 1
                }
            ]
        };
    
        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
            // Adjust canvas resolution for high DPI
    const chartCanvas = document.getElementById('chartId') as HTMLCanvasElement;
    if (chartCanvas) {
        const ratio = window.devicePixelRatio || 1; // Get device pixel ratio
        chartCanvas.width = chartCanvas.offsetWidth * ratio;
        chartCanvas.height = chartCanvas.offsetHeight * ratio;
        chartCanvas.getContext('2d')?.scale(ratio, ratio);
    }

    }    

    screenshotChart() {
        const chartCanvas = this.chart.chart.canvas; // Access the chart's canvas
        if (!chartCanvas) {
            console.error('Chart canvas not found!');
            return;
        }

        const chartImage = chartCanvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = chartImage;
        downloadLink.download = 'chart-screenshot.png';
        downloadLink.click();
    }
    

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
