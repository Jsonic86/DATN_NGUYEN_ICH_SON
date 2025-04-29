import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { CartItem } from 'src/app/core/interface/cart-item.interface';
import { getCookie } from 'src/app/core/utils';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product-by-cartegory',
  templateUrl: './list-product-by-cartegory.component.html',
  styleUrls: ['./list-product-by-cartegory.component.scss']
})
export class ListProductByCartegoryComponent implements OnInit {
  id?: number;
  listItems: any[] = [];
  constructor(private productService: ProductService, private notification: NzNotificationService, private cartService: CartService) {

  }
  ngOnInit(): void {
    const urlSegments = window.location.href.split('/');
    this.id = +urlSegments[urlSegments.length - 1];
    if (this.id) {
      this.productService.getAllProductsByCategory({ categoryId: this.id }).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          if (res.result.content.length > 0) {
            this.listItems = res.result.content;
          }
        }
      })
    }
  }

}

