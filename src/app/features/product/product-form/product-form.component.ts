import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  inject,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductCategory } from '../../../models/product.model';
import { ProductsStore } from '../../../core/store/product.store';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  categories = Object.values(ProductCategory);
  isEditMode = false;

  private readonly store = inject(ProductsStore);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private effectRef: any;

  constructor() {
    this.initForm();

    this.effectRef = effect(() => {
      const selected = this.store.selectedProduct();
      if (selected) {
        this.isEditMode = true;
        this.productForm.patchValue(selected);
        this.productForm.markAsDirty();
        this.productForm.markAsTouched();
      } else {
        this.isEditMode = false;
        this.resetForm();
      }

      this.cdr.markForCheck();
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    if (this.store.products().length === 0) {
      this.store.initializeWithSampleData();
    }
  }

  ngOnDestroy(): void {
    this.effectRef?.destroy();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: [ProductCategory.ELECTRONICS, Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  private resetForm(): void {
    this.productForm.reset({
      name: '',
      category: ProductCategory.ELECTRONICS,
      price: 0,
      stockQuantity: 0
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.markAllTouched();
      return;
    }

    const data = this.productForm.value;

    if (this.isEditMode && this.store.selectedProduct()) {
      this.store.updateProduct({ ...this.store.selectedProduct()!, ...data });
    } else {
      this.store.addProduct(data);
    }

    this.store.clearSelectedProduct();
    this.resetForm();
  }

  cancelEdit(): void {
    this.store.clearSelectedProduct();
    this.resetForm();
  }

  private markAllTouched(): void {
    Object.values(this.productForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  get form() {
    return this.productForm.controls;
  }

  hasError(field: string, type: string): boolean {
    const control = this.productForm.get(field);
    return !!(control?.hasError(type) && (control.dirty || control.touched));
  }

  getErrorMessage(field: string): string {
    const control = this.productForm.get(field);
    if (!control?.errors || !(control.dirty || control.touched)) return '';

    if (control.errors['required']) return `${field} is required`;
    if (control.errors['minlength']) return `${field} must be at least ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors['min']) return `${field} must be greater than ${control.errors['min'].min}`;

    return '';
  }

  testEditMode(): void {
    const first = this.store.products()[0];
    if (first) this.store.selectProduct(first.id);
  }

  testDirectEdit(): void {
    const first = this.store.products()[0];
    if (first) this.enableEditMode(first); 
  }

  getCurrentState(): void {
    console.table({
      Products: this.store.products(),
      Selected: this.store.selectedProduct(),
      EditMode: this.isEditMode,
      Value: this.productForm.value,
      Valid: this.productForm.valid
    });
  }


  private enableEditMode(product: Product): void {
    this.productForm.patchValue(product);
    this.productForm.markAsDirty();
    this.productForm.markAsTouched();
    this.isEditMode = true;
  }
}
