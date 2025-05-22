import { Component, OnInit, OnDestroy, effect, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ProductsStore } from '../../../core/store/product.store';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-trend-chart',
   imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trend-chart.component.html',
  styleUrl: './trend-chart.component.css'
})
export class TrendChartComponent implements OnInit, OnDestroy {
  trendChart: Chart | undefined;
  private productsStore = inject(ProductsStore);
  constructor() {}
  ngOnInit(): void {
    this.createTrendChart();
    effect(() => {
      const trendData = this.productsStore.productTrends();
      this.updateTrendChart(trendData);
    });
  }
  ngOnDestroy(): void {
    if (this.trendChart) {
      this.trendChart.destroy();
    }
  }
 private createTrendChart(): void {
    const ctx = document.getElementById('trendChart') as HTMLCanvasElement;
    if (!ctx) return;
    const trendData = this.productsStore.productTrends();
    this.trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: trendData.map(item => item.month),
        datasets: [{
          label: 'Products Added',
          data: trendData.map(item => item.count),
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Product Addition Trends'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  private updateTrendChart(trendData: { month: string; count: number }[]): void {
    if (!this.trendChart) return;
    this.trendChart.data.labels = trendData.map(item => item.month);
    this.trendChart.data.datasets[0].data = trendData.map(item => item.count);
    this.trendChart.update();
  }
}
