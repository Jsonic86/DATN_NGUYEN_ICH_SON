import { Component } from '@angular/core';
import { CartItem } from 'src/app/core/interface/cart-item.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-carts',
  templateUrl: './shopping-carts.component.html',
  styleUrls: ['./shopping-carts.component.scss']
})
export class ShoppingCartsComponent {
  constructor(public cartService: CartService) { }
  cartItems: CartItem[] = [];

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
  }
  remove(id: string) {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartService.getItems();
  }
  getTotal(): number {
    let items = this.cartService.getItems().filter(item => item.checked === true);
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  updateQuantity(item: any, e: any) {
    const input = e.target as HTMLInputElement;
    const newValue = parseInt(input.value, 10);
    this.cartService.updateQuantity(item, newValue);
  }
  onCheckedItem(item: any) {
    this.cartService.getItems().forEach(i => {
      if (i.productId === item.productId && i.userName === item.userName) {
        i.checked = item.checked;
      }
    })
    this.cartService.saveCart();
  }
}
