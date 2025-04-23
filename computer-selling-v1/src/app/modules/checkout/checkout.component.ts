import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  myInfor?: any;
  checkoutForm!: FormGroup;
  constructor(public cartService: CartService, private userService: UserService, private fb: FormBuilder, private orderService: OrderService, private notification: NzNotificationService, private route: Router) {

  }
  initForm(item: any = null) {
    this.checkoutForm = this.fb.group({
      name: [item?.firstName + ' ' + item?.lastName],
      phone: [item?.customer?.phoneNumber],
      email: [item?.customer?.email],
      address: [item?.customer?.address],
      note: [item?.customer?.note]
    })
  }
  ngOnInit() {
    this.initForm();
    this.userService.getInfo().subscribe(res => {
      if (res.code === StatusResponse.OK) {
        this.myInfor = res.result;
        this.initForm(this.myInfor)
      }
    })
  }
  onCreateOrder() {
    let itemFromCarts: any[] = [];
    this.cartService.getItems().forEach((item: any) => {
      itemFromCarts.push({
        productId: item.productId,
        quantity: item.quantity
      })
    })
    const payload = {
      shipment: {
        phoneNumber: this.checkoutForm.get('phone')?.value,
        address: this.checkoutForm.get('address')?.value,
        email: this.checkoutForm.get('email')?.value,
        note: this.checkoutForm.get('note')?.value,
      },
      items: itemFromCarts
    }
    this.orderService.createOrder(payload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK) {
        this.route.navigate(['/user/list-order']);
        this.notification.success('Thông báo', 'Đặt hàng thành công');
      }
    })
  }

}
