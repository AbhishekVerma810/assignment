import { Component, OnInit, OnDestroy, effect, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ProductsStore, ProductsStoreType } from '../../../core/store/product.store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-stock-chart',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './stock-chart.component.html',
  styleUrl: './stock-chart.component.css'
})
export class StockChartComponent implements OnInit, OnDestroy {
  stockChart: Chart | undefined;
  private productsStore = inject(ProductsStore);
  constructor() { }
  ngOnInit(): void {
    this.createStockChart();
    effect(() => {
      const stockData = this.productsStore.stockLevels();
      this.updateStockChart(stockData);
    });
  }
  ngOnDestroy(): void {
    if (this.stockChart) {
      this.stockChart.destroy();
    }
  }
  private createStockChart(): void {
    const ctx = document.getElementById('stockChart') as HTMLCanvasElement;
    if (!ctx) return;
    const stockData = this.productsStore.stockLevels();
    this.stockChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: stockData.map(item => item.name),
        datasets: [{
          label: 'Stock Quantity',
          data: stockData.map(item => item.stockQuantity),
          backgroundColor: '#36A2EB'
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
            text: 'Product Stock Levels'
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
  private updateStockChart(stockData: { name: string; stockQuantity: number }[]): void {
    if (!this.stockChart) return;
    this.stockChart.data.labels = stockData.map(item => item.name);
    this.stockChart.data.datasets[0].data = stockData.map(item => item.stockQuantity);
    this.stockChart.update();
  }
}
