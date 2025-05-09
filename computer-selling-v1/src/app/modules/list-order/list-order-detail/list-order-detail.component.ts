import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Column } from 'src/app/core/const/column.type';
import { PaymentMethod, STATUS, STATUS_PAYMENT, StatusResponse, TYPE } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { Order } from 'src/app/model/response/order.response';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-list-order-detail',
  templateUrl: './list-order-detail.component.html',
  styleUrls: ['./list-order-detail.component.scss']
})
export class ListOrderDetailComponent {
  @Input() data: any = null;
  item!: Order;
  fieldName: any = ['username', 'firstName', 'lastName', 'localDate'];
  token: string | null = '';
  settingValue: SettingValue = {
    size: 'middle',
    border: true,
    checkBox: false
  }
  cols: Column[] = [];
  loading: boolean = false;
  totalElements: number = 0;
  page: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';
  id: string = '';
  STATUS = STATUS;
  PaymentMethod = PaymentMethod;
  STATUS_PAYMENT = STATUS_PAYMENT;
  constructor(private notification: NzNotificationService, private route: Router, private orderService: OrderService, private paymentService: PaymentService) {
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
    const segments = this.route.url.split('/');
    this.id = segments[segments.length - 1];
    console.log(this.id);
    if (this.id) {
      this.orderService.getOrderDetail({ orderId: this.id }).subscribe((res: any) => {
        if (res.code === StatusResponse.OK) {
          if (res.result) {
            this.item = res.result;
          }
        } else {
          this.notification.error('Lỗi', res.message);
        }
      })
    }
    this.cols = [
      {
        id: '0',
        arr: 'Tên sản phẩm',
        fieldName: 'name',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '1',
        arr: 'Hình ảnh',
        fieldName: 'imageUrl',
        width: '10em',
        type: TYPE.IMAGE,
      },
      {
        id: '2',
        arr: 'Số lượng',
        fieldName: 'quantity',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '3',
        arr: 'Đơn giá',
        fieldName: 'unitPrice',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '4',
        arr: 'Tổng tiền',
        fieldName: 'totalPrice',
        width: '10em',
        type: TYPE.TEXT,
      },
    ]

  }
  statusBackground(status: string): string {
    let className = '';
    switch (STATUS[status]) {
      case 'Chờ xử lý': className = 'bg-secondary'
        break;
      case 'Đang giao': className = 'bg-warning'
        break;
      case 'Hoàn thành': className = 'bg-success'
        break;
      case 'Đã hủy': className = 'bg-danger'
        break;
    }
    return className;
  }
  statusPaymentBackground(status: string): string {
    let className = '';
    switch (STATUS_PAYMENT[status]) {
      case 'Chưa thanh toán': className = 'bg-secondary'
        break;
      case 'Đã thanh toán': className = 'bg-success'
        break;
      case 'Hoàn tiền': className = 'bg-primary'
        break;
    }
    return className;
  }
  getTotal() {
    let total = 0;
    this.item.orderDetails.forEach((item) => {
      total += item.totalPrice;
    })
    return total;
  }
  onPay() {
    const payload = {
      orderInfo: this.item.orderId,
      amount: this.item.totalAmount,
      returnUrl: 'http://localhost:4200/payment-success',
    }
    this.paymentService.create(payload).subscribe(res => {
      window.location.href = res.result;
    });
  }
  ngAfterViewInit() {

  }
}
