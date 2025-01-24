import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  private productService = inject(ProductService);
  private formBuilder = inject(FormBuilder);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  productForm: FormGroup
  isEditMode: boolean = false

  constructor() {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2) ,Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(100)]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true
        this.loadProduct(params['id'])
      }
    });
  }

  private loadProduct(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        // guarda los valores del producto del formulario en bloque con setValue se hace uno a uno
        this.productForm.patchValue(product)
      },
      error: (error) => {
        this.snackBar.open(error.error.message, 'Error', { duration: 2000 })
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) return

    const productData = {...this.productForm.value}

    if(this.isEditMode) {
      this.productService.updateProduct(productData.id, productData).subscribe({
        next: () => {
          this.snackBar.open('Product updated successfully', 'Close', { duration: 2000 })
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Error', { duration: 2000 })
        }
      });
    } else {
      delete productData.id;

      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.snackBar.open('Product created successfully', 'Close', { duration: 2000 })
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.snackBar.open(error.error.message, 'Error', { duration: 2000 })
        }
      })
    }
  }
}
