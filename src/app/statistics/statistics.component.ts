import { Component } from '@angular/core';
import { catchError, map, Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { VerticalBarData } from '../interfaces/vertical-bar-response-data';

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

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
    ) { }

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Sales',
                    data: [],
                    backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                    borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
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
        this.getVerticalBarData(2024);
    }

    getVerticalBarData(year: number) {
        this.statisticsSubscription = this.productService.getVerticalBarData(year).pipe(
            map(response => {
                const responseData = response?.data?.verticalBarData || []; // Safely extract verticalBarData
                return responseData; // Extract verticalBarData directly
            }),
            catchError(error => {
                console.error('Error fetching vertical bar data:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to load vertical bar data.'
                });
                return []; // Return empty array in case of error
            })
        ).subscribe({
            next: (verticalBarData) => {
                this.verticalBarData = verticalBarData;
            },
            error: (error) => {
                console.error('Error during vertical bar data fetch:', error);
            }
        });
    
        this.subscriptions.push(this.statisticsSubscription);
    }    

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
