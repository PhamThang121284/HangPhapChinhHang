import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ProductCardComponent } from '../../shared/components/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <section class="hero">
      <h1>Hàng Pháp Chính Hãng</h1>
      <p>Mỹ phẩm Pháp chính hãng dành cho khách hàng Việt Nam.</p>
    </section>

    <section>
      <h2 class="section-title">Sản phẩm nổi bật</h2>
      <div class="grid grid-3">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        background: white;
        padding: 24px;
        border-radius: 12px;
        margin-bottom: 24px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<{ items: any[] }>('/products', { page: 1 }).subscribe((res) => {
      this.products = res.items;
    });
  }
}
