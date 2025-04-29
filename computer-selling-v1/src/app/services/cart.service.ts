import { Injectable } from '@angular/core';
import { CartItem } from '../core/interface/cart-item.interface';
import { getCookie } from '../core/utils';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  getItems(): CartItem[] {
    return this.items.filter(item => item?.userName === getCookie('userName'));
  }

  addToCart(item: CartItem) {
    const existing = this.items.find(i => (i.productId === item.productId));
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
    this.saveCart();
  }

  removeFromCart(id: string) {
    const currentUser = getCookie('userName');
    this.items = this.items.filter(item => {
      // Nếu không phải của user hiện tại → giữ nguyên
      if (item.userName !== currentUser) return true;

      // Nếu là của user hiện tại nhưng KHÔNG trùng id cần xóa → giữ lại
      return item.id !== id;
    });

    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotal(): number {
    let items = this.items.filter(item => item?.userName === getCookie('userName'));
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
