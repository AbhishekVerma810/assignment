import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { StockChartComponent } from './stock-chart/stock-chart.component';
import { TrendChartComponent } from './trend-chart/trend-chart.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
 
  imports: [
    CommonModule,
    SharedModule,
    DashboardComponent,
    CategoryChartComponent,
    StockChartComponent,
    TrendChartComponent
  ],
 
})
export class DashboardModule { }