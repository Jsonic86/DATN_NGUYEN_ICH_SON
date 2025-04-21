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
  remove(id: number) {
    this.cartService.removeFromCart(id);
    this.cartItems = this.cartService.getItems();
  }
}
