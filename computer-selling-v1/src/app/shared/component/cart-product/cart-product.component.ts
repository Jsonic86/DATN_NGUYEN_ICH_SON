import { Component, Input } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CartItem } from 'src/app/core/interface/cart-item.interface';
import { getCookie } from 'src/app/core/utils';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent {
  @Input() item: any;
  constructor(private cartService: CartService, private notification: NzNotificationService) {

  }
  generateSimpleId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }
  addToCart(product: any) {
    const item: CartItem = {
      id: this.generateSimpleId(),
      productId: product.productId,
      name: product.productName,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      userName: getCookie('userName')!
    };
    this.cartService.addToCart(item);
    this.notification.success('Thông báo', 'Thêm vào giỏ hàng thành công');

  }
}
