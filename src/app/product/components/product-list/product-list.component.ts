import { Product } from './../../interfaces/product';
import { Component, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  private productService = inject(ProductService)

  product: Product[] = []

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (resp) => {
        console.log('API response', resp);
      },
      error: (err) => {
        console.error('API error', err);
      },
      complete: () => {
        console.log('API request completed')
      }
    })
  }
}
