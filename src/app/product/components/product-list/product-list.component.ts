import { AfterViewInit, Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';


import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, AfterViewInit {

  title = 'List of Products';

  private productService = inject(ProductService)
  private router = inject(Router);
  
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
  }

  navigateToForm(id?: number): void {
    const path = id ? `/products/edit/${id}` : '/products/new';
    console.log(path);
    this.router.navigate([path]);
  }

  deleteProduct(id?: number): void {
    console.log('Delete product', id);
  }
}
