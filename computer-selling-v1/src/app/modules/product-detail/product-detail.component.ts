import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CartItem } from 'src/app/core/interface/cart-item.interface';
import { getCookie } from 'src/app/core/utils';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  id?: number;
  item?: any;
  selectedQuantity: number = 1;
  constructor(private route: Router, private productService: ProductService, private cartService: CartService, private notification: NzNotificationService) { }
  ngOnInit(): void {
    const urlSegments = window.location.href.split('/');
    this.id = +urlSegments[urlSegments.length - 1];
    if (this.id) {
      this.productService.getById(this.id.toString()).subscribe(res => {
        this.item = res.result;
      })
    }
  }
  generateSimpleId(): string {
    return `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
  }
  addToCart(product: any) {
    if (this.selectedQuantity <= product.stockQuantity) {
      const item: CartItem = {
        id: this.generateSimpleId(),
        productId: product.productId,
        name: product.productName,
        price: product.price,
        quantity: this.selectedQuantity,
        imageUrl: product.imageUrl,
        userName: getCookie('userName')!
      };
      this.cartService.addToCart(item);
      this.notification.success('Thông báo', 'Thêm vào giỏ hàng thành công');
    }
    else {
      this.notification.error('Thông báo', 'Số lượng sản phẩm không đủ trong kho');
    }
  }
}
