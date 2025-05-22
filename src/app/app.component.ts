import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Feature modules
import { ProductModule } from './features/product/product.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { CategoryChartComponent } from './features/dashboard/category-chart/category-chart.component';
import { StockChartComponent } from './features/dashboard/stock-chart/stock-chart.component';
import { TrendChartComponent } from './features/dashboard/trend-chart/trend-chart.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule,
    ProductModule,
    DashboardModule,
    SharedModule,
    DashboardComponent,
    CategoryChartComponent,
    StockChartComponent,
    TrendChartComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [],

})
export class AppComponent {
  title = 'Product Inventory Management';
  currentYear = new Date().getFullYear();
  constructor(private router:Router){
    this.router.navigate(['/router'])
  }
  navigate(routeName: string) {
  this.router.navigate([routeName]);
 }
}
