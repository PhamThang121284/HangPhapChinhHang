import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../core/services/cart.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2 class="section-title">Giỏ hàng</h2>
    <div *ngIf="items.length === 0">Giỏ hàng trống.</div>

    <div *ngFor="let item of items" class="cart-item">
      <img [src]="item.image" [alt]="item.title" />
      <div class="info">
        <div>{{ item.title }}</div>
        <div>{{ item.price | number }}đ</div>
      </div>
      <input type="number" [value]="item.qty" (change)="updateQty(item, $event.target.value)" />
      <button (click)="removeItem(item)">Xóa</button>
    </div>

    <div class="summary">
      <div>Tổng: {{ total | number }}đ</div>
    </div>

    <form [formGroup]="shippingForm" class="shipping">
      <h3>Thông tin giao hàng</h3>
      <input formControlName="fullName" placeholder="Họ và tên" />
      <input formControlName="phone" placeholder="Số điện thoại" />
      <input formControlName="line1" placeholder="Địa chỉ" />
      <input formControlName="district" placeholder="Quận/Huyện" />
      <input formControlName="city" placeholder="Thành phố" />
      <button type="button" (click)="placeOrder()">Đặt hàng</button>
    </form>
  `,
  styles: [
    `
      .cart-item {
        display: grid;
        grid-template-columns: 80px 1fr 80px 80px;
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
        background: white;
        padding: 12px;
        border-radius: 8px;
      }
      .cart-item img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
      }
      .shipping input {
        display: block;
        margin-bottom: 8px;
        padding: 8px;
        width: 100%;
      }
    `,
  ],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  total = 0;

  shippingForm = this.fb.group({
    fullName: [''],
    phone: [''],
    line1: [''],
    district: [''],
    city: [''],
  });

  constructor(private cart: CartService, private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.items = this.cart.getItems();
    this.calculateTotal();
  }

  updateQty(item: CartItem, qty: string): void {
    const nextQty = Number(qty);
    this.cart.updateQty(item.productId, item.variantId, nextQty);
    this.items = this.cart.getItems();
    this.calculateTotal();
  }

  removeItem(item: CartItem): void {
    this.cart.removeItem(item.productId, item.variantId);
    this.items = this.cart.getItems();
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  placeOrder(): void {
    const shipping = {
      ...this.shippingForm.value,
      country: 'VN',
    };
    this.api.post('/orders', { items: this.items, shippingAddress: shipping }).subscribe(() => {
      this.cart.clear();
      this.items = [];
      this.calculateTotal();
    });
  }
}
