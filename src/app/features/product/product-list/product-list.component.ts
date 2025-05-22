import { Component, inject, OnInit } from '@angular/core';
import { ProductsStore } from '../../../core/store/product.store';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ReactiveFormsModule } from '@angular/forms'; // For formGroup
import { ProductFormComponent } from '../../product/product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule, ReactiveFormsModule,ProductFormComponent],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public productsStore = inject(ProductsStore);
  constructor() {}
   ngOnInit(): void {
  
    if (this.productsStore.products().length === 0) {
      this.productsStore.initializeWithSampleData();
    }
  }

  editProduct(productId: string): void {

    this.productsStore.selectProduct(productId);
  }

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsStore.deleteProduct(productId);
    }
  }
}
