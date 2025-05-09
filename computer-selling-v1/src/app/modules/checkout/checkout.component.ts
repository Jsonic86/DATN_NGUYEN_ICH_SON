import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { AddAddressShipmentComponent } from './add-address-shipment/add-address-shipment.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  myInfor?: any;
  checkoutForm!: FormGroup;
  listAddress: any[] = [];
  constructor(public cartService: CartService, private userService: UserService, private fb: FormBuilder, private orderService: OrderService, private notification: NzNotificationService, private route: Router, private modalService: NzModalService) {

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
    const selected: any = document.querySelector('input[name="pay-method"]:checked');
    // if (selected.value === 'THE_TIN_DUNG') {
    //   this.notification.success('Thông báo', 'aaaa')
    // }
    // else {
    let itemFromCarts: any[] = [];
    this.cartService.getItems().forEach((item: any) => {
      if (item.checked === true) {
        itemFromCarts.push({
          productId: item.productId,
          quantity: item.quantity
        })
      }
    })
    let shipmentPayload: any;
    this.listAddress.forEach((element: any) => {
      if (element.selected === true) {
        shipmentPayload = {
          name: element.name,
          phoneNumber: element.phone,
          address: element.address
        };
      }
    })
    const payload = {
      bill: {
        phoneNumber: this.checkoutForm.get('phone')?.value,
        address: this.checkoutForm.get('address')?.value,
        email: this.checkoutForm.get('email')?.value,
        note: this.checkoutForm.get('note')?.value,
      },
      shipment: shipmentPayload,
      items: itemFromCarts,
      payment: {
        paymentMethod: selected.value,
      }
    }
    this.orderService.createOrder(payload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK) {
        this.notification.success('Thông báo', 'Đặt hàng thành công');
        this.cartService.getItems().forEach(i => {
          if (i.checked === true) {
            this.cartService.removeFromCart(i.id);
          }
        })
        this.cartService.saveCart();
        this.route.navigate(['/user/list-order']);

      }
    })
    // }
  }
  onChecked(e: any, i: number) {
    this.listAddress.forEach((element: any, index: number) => {
      if (index === i) {
        element.selected = e.target.checked;
      } else {
        element.selected = false;
      }
    })
  }
  filterCart() {
    return this.cartService.getItems().filter(item => item.checked === true);
  }
  getTotal(): number {
    let items = this.cartService.getItems().filter(item => item.checked === true);
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
  addAddressShipment() {
    this.modalService.create({
      nzTitle: 'Thêm địa chỉ giao hàng',
      nzContent: AddAddressShipmentComponent,
      nzWidth: '40%',
      nzMaskClosable: false,
      nzFooter: null
    })
      .afterClose.subscribe((res: any) => {
        if (res) {
          this.listAddress.push(res);
        }
      })
  }
}
