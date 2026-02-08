import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <img mat-card-image [src]="product.images[0]" [alt]="product.title" />
      <mat-card-title>{{ product.title }}</mat-card-title>
      <mat-card-subtitle>{{ product.brand }}</mat-card-subtitle>
      <mat-card-content>
        <div>{{ product.variants[0]?.price | number }}đ</div>
      </mat-card-content>
      <mat-card-actions>
        <a mat-button [routerLink]="['/products', product.slug]">Xem chi tiết</a>
      </mat-card-actions>
    </mat-card>
  `,
})
export class ProductCardComponent {
  @Input() product!: any;
}
