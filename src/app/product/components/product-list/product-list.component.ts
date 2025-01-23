import { AfterViewInit, Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { Product } from './../../interfaces/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  private productService = inject(ProductService)

  
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.updateTableData();
      }
    })
  }

  updateTableData() {
    this.dataSource.data = this.products();
    this.dataSource.paginator = this.paginator;
  }

  navigateToForm(id?: number): void {
    console.log('Navigate to form');
  }

  deleteProduct(id?: number): void {
    console.log('Delete product', id);
  }
}
