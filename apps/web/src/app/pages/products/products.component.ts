import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ProductCardComponent } from '../../shared/components/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
  template: `
    <h2 class="section-title">Danh sách sản phẩm</h2>
    <form [formGroup]="filters" class="filters">
      <input formControlName="q" placeholder="Tìm kiếm theo tên" />
      <select formControlName="category">
        <option value="">Tất cả danh mục</option>
        <option *ngFor="let cat of categories" [value]="cat._id">{{ cat.name.vi }}</option>
      </select>
      <select formControlName="sort">
        <option value="newest">Mới nhất</option>
        <option value="price-asc">Giá tăng dần</option>
        <option value="price-desc">Giá giảm dần</option>
      </select>
      <button type="button" (click)="applyFilters()">Lọc</button>
    </form>

    <div class="grid grid-3">
      <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
    </div>

    <div class="pagination">
      <button (click)="prevPage()" [disabled]="page === 1">Trước</button>
      <span>Trang {{ page }}</span>
      <button (click)="nextPage()" [disabled]="page * 12 >= total">Sau</button>
    </div>
  `,
  styles: [
    `
      .filters {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
      }
      .filters input,
      .filters select {
        padding: 8px;
      }
      .pagination {
        margin-top: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
    `,
  ],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  total = 0;
  page = 1;

  filters = this.fb.group({
    q: [''],
    category: [''],
    sort: ['newest'],
  });

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.api.get<any[]>('/categories/tree').subscribe((res) => {
      this.categories = res;
    });
  }

  loadProducts(): void {
    const { q, category, sort } = this.filters.value;
    this.api
      .get<{ items: any[]; total: number }>('/products', {
        q: q ?? '',
        category: category ?? '',
        sort: sort ?? 'newest',
        page: this.page,
      })
      .subscribe((res) => {
        this.products = res.items;
        this.total = res.total;
      });
  }

  applyFilters(): void {
    this.page = 1;
    this.loadProducts();
  }

  nextPage(): void {
    this.page += 1;
    this.loadProducts();
  }

  prevPage(): void {
    this.page = Math.max(1, this.page - 1);
    this.loadProducts();
  }
}
