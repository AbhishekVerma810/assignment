import { Component, OnInit, OnDestroy, effect, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ProductsStore } from '../../../core/store/product.store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-category-chart',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-chart.component.html',
  styleUrl: './category-chart.component.css'
})
export class CategoryChartComponent implements OnInit, OnDestroy {
  categoryChart: Chart | undefined;
  public productsStore = inject(ProductsStore);
  constructor() { }
  ngOnInit(): void {
    this.createCategoryChart();
    effect(() => {
      const categoryData = this.productsStore.productsByCategory();
      this.updateCategoryChart(categoryData);
    });
  }
  ngOnDestroy(): void {
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
  }
  private createCategoryChart(): void {
    const ctx = document.getElementById('categoryChart') as HTMLCanvasElement;
    if (!ctx) return;
    const categoryData = this.productsStore.productsByCategory();
    this.categoryChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categoryData.map(item => item.category),
        datasets: [{
          data: categoryData.map(item => item.count),
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
          ]
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
            text: 'Products by Category'
          }
        }
      }
    });
  }
  private updateCategoryChart(categoryData: { category: string; count: number }[]): void {
    if (!this.categoryChart) return;
    this.categoryChart.data.labels = categoryData.map(item => item.category);
    this.categoryChart.data.datasets[0].data = categoryData.map(item => item.count);
    this.categoryChart.update();
  }
}