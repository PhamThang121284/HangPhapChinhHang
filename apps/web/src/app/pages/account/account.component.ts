import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Tài khoản</h2>
    <section>
      <h3>Đơn hàng gần đây</h3>
      <div *ngFor="let order of orders" class="order">
        <div>Mã đơn: {{ order._id }}</div>
        <div>Tổng: {{ order.total | number }}đ</div>
        <div>Trạng thái: {{ order.status }}</div>
      </div>
    </section>

    <section>
      <h3>Thói quen mua sắm</h3>
      <div>Đã xem gần đây: {{ habits.recentlyViewed.join(', ') || 'Chưa có dữ liệu' }}</div>
      <div>Mua thường xuyên: {{ habits.frequentlyBought.join(', ') || 'Chưa có dữ liệu' }}</div>
    </section>
  `,
  styles: [
    `
      .order {
        background: white;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class AccountComponent implements OnInit {
  orders: any[] = [];
  habits = {
    recentlyViewed: ['Serum phục hồi Lumière'],
    frequentlyBought: ['Son lì Paris Velvet'],
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<any[]>('/orders/me').subscribe((orders) => (this.orders = orders));
  }
}
