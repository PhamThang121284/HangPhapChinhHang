import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Quản trị sản phẩm</h2>
    <form [formGroup]="form" (ngSubmit)="createProduct()" class="admin-form">
      <input formControlName="title" placeholder="Tên sản phẩm" />
      <input formControlName="slug" placeholder="Slug" />
      <input formControlName="brand" placeholder="Thương hiệu" />
      <select formControlName="category">
        <option *ngFor="let cat of categories" [value]="cat._id">{{ cat.name.vi }}</option>
      </select>
      <input formControlName="images" placeholder="Ảnh (URL, cách nhau bằng dấu phẩy)" />
      <input formControlName="price" type="number" placeholder="Giá" />
      <button type="submit">Tạo sản phẩm</button>
    </form>

    <div *ngFor="let product of products" class="admin-item">
      <div>{{ product.title }} - {{ product.variants[0]?.price | number }}đ</div>
      <button (click)="toggle(product)">
        {{ product.isActive ? 'Ngừng bán' : 'Kích hoạt' }}
      </button>
    </div>
  `,
  styles: [
    `
      .admin-form input,
      .admin-form select {
        display: block;
        margin-bottom: 8px;
        padding: 8px;
      }
      .admin-item {
        background: white;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class AdminComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  form = this.fb.group({
    title: [''],
    slug: [''],
    brand: [''],
    category: [''],
    images: [''],
    price: [0],
  });

  constructor(private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.api.get<{ items: any[] }>('/products', { page: 1 }).subscribe((res) => {
      this.products = res.items;
    });
  }

  loadCategories(): void {
    this.api.get<any[]>('/categories/tree').subscribe((res) => {
      this.categories = res;
    });
  }

  createProduct(): void {
    const value = this.form.value;
    const payload = {
      title: value.title,
      slug: value.slug,
      brand: value.brand,
      categories: value.category ? [value.category] : [],
      images: value.images?.split(',').map((url) => url.trim()),
      hasVariants: true,
      variants: [{ price: value.price, inventory: 20, options: {} }],
      madeIn: 'France',
      inci: 'N/A',
      isActive: true,
    };
    this.api.post('/products', payload).subscribe(() => this.loadProducts());
  }

  toggle(product: any): void {
    this.api.put(`/products/${product._id}`, { isActive: !product.isActive }).subscribe(() => {
      this.loadProducts();
    });
  }
}
