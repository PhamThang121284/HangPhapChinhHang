import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="product">
      <div class="detail">
        <img [src]="selectedImage" [alt]="product.title" />
        <div>
          <h2>{{ product.title }}</h2>
          <p>{{ product.brand }}</p>
          <p>{{ product.description }}</p>
          <div class="variants">
            <label>Chọn biến thể</label>
            <select (change)="selectVariant($event.target.value)">
              <option *ngFor="let variant of product.variants" [value]="variant._id">
                {{ variant.options?.shade || variant.options?.size || 'Mặc định' }} -
                {{ variant.price | number }}đ
              </option>
            </select>
          </div>
          <button (click)="addToCart()">Thêm vào giỏ</button>
        </div>
      </div>
      <div class="gallery">
        <img
          *ngFor="let image of product.images"
          [src]="image"
          [alt]="product.title"
          (click)="selectedImage = image"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }
      .detail img {
        width: 100%;
        border-radius: 12px;
      }
      .gallery {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }
      .gallery img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        cursor: pointer;
        border-radius: 6px;
      }
    `,
  ],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  selectedVariant: any;
  selectedImage = '';

  constructor(private route: ActivatedRoute, private api: ApiService, private cart: CartService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.api.get<any>(`/products/${slug}`).subscribe((product) => {
      this.product = product;
      this.selectedVariant = product.variants[0];
      this.selectedImage = product.images[0];
    });
  }

  selectVariant(variantId: string): void {
    this.selectedVariant = this.product.variants.find((variant: any) => variant._id === variantId);
  }

  addToCart(): void {
    this.cart.addItem({
      productId: this.product._id,
      variantId: this.selectedVariant?._id,
      title: this.product.title,
      price: this.selectedVariant?.price ?? 0,
      qty: 1,
      image: this.product.images[0],
    });
  }
}
