import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  
    ProductFormComponent
  ],
  exports: [
   
    ProductFormComponent
  ]
})
export class ProductModule { }