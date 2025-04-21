import { Injectable } from '@angular/core';
import { CartItem } from '../core/interface/cart-item.interface';

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
    return this.items;
  }

  addToCart(item: CartItem) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
    this.saveCart();
  }

  removeFromCart(id: number) {
    this.items = this.items.filter(item => item.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
