import { Component, inject } from '@angular/core';
import { ProductsStore } from '../../../core/store/product.store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryChartComponent } from '../category-chart/category-chart.component';
import { StockChartComponent } from '../stock-chart/stock-chart.component';
import { TrendChartComponent } from '../trend-chart/trend-chart.component';
import { ProductFormComponent } from '../../product/product-form/product-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ProductFormComponent, ReactiveFormsModule, CategoryChartComponent, StockChartComponent, TrendChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public productsStore = inject(ProductsStore);
  constructor() { }

}

