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
  public saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  getItems(): CartItem[] {
    return this.items.filter(item => item?.userName === getCookie('userName'));
  }
  updateQuantity(item: any, quantity: number) {
    this.items = this.items.map(i => {
      if (i.id === item.id) {
        i.quantity = quantity;
      }
      return i;
    });
    this.saveCart();
  }
  addToCart(item: CartItem) {
    const existing = this.items.find(i => (i.productId === item.productId && i.userName === item.userName));
    if (existing) {
      existing.quantity += Number(item.quantity);
      existing.checked = item.checked;
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
