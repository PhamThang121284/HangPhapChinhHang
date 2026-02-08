import { Injectable } from '@angular/core';

export interface CartItem {
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  qty: number;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly key = 'hp_cart';

  getItems(): CartItem[] {
    const raw = localStorage.getItem(this.key);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  }

  addItem(item: CartItem): void {
    const items = this.getItems();
    const existing = items.find((it) => it.productId === item.productId && it.variantId === item.variantId);
    if (existing) {
      existing.qty += item.qty;
    } else {
      items.push(item);
    }
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  updateQty(productId: string, variantId: string | undefined, qty: number): void {
    const items = this.getItems().map((item) =>
      item.productId === productId && item.variantId === variantId ? { ...item, qty } : item
    );
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  removeItem(productId: string, variantId: string | undefined): void {
    const items = this.getItems().filter(
      (item) => !(item.productId === productId && item.variantId === variantId)
    );
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
