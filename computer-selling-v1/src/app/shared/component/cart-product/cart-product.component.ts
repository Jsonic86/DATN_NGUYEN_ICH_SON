import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginComponent } from 'src/app/auth/login/login/login.component';
import { RegisterComponent } from 'src/app/auth/register/register/register.component';
import { CartItem } from 'src/app/core/interface/cart-item.interface';
import { getCookie } from 'src/app/core/utils';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss']
})
export class CartProductComponent {
  @Input() item: any;
  constructor(private cartService: CartService, private modalService: NzModalService, private notification: NzNotificationService, private authService: AuthService, private router: Router) {

  }
  generateSimpleId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }
  onRegister() {
    const modal = this.modalService.create({
      nzTitle: 'Đăng kí',
      nzContent: RegisterComponent,
      nzWidth: '50%',
      nzMaskClosable: false,
      nzFooter: null,

    })
    modal.afterClose.subscribe((res: any) => {
      if (res == 'login') {
        this.onLogin();
      }
    })
  }
  onLogin() {
    const modal = this.modalService.create({
      nzTitle: 'Đăng nhập',
      nzContent: LoginComponent,
      nzWidth: '30%',
      nzMaskClosable: false,
      nzFooter: null,
    })
    modal.afterClose.subscribe((res: any) => {
      if (res == 'register') {
        this.onRegister();
      }
    })
  }
  addToCart(product: any) {
    if (this.authService.isLoggedIn()) {
      const item: CartItem = {
        id: this.generateSimpleId(),
        productId: product.productId,
        name: product.productName,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        userName: getCookie('userName')!,
        checked: false
      };
      this.cartService.addToCart(item);
      this.notification.success('Thông báo', 'Thêm vào giỏ hàng thành công');
    }
    else {
      this.onLogin();
    }

  }
}
