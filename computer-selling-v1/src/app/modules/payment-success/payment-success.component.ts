import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  orderInfo: any = {};

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderInfo = {
        txnRef: params['vnp_TxnRef'],
        amount: this.formatCurrency(params['vnp_Amount']),
        bank: params['vnp_BankCode'],
        date: this.formatDate(params['vnp_PayDate']),
        transactionNo: params['vnp_TransactionNo'],
        status: this.getStatus(params['vnp_ResponseCode'], params['vnp_TransactionStatus']),
        orderId: params['vnp_OrderInfo'],
      };
    });
    if (this.orderInfo.status === 'Thành công') {
      this.paymentService.updateSatus({ orderId: this.orderInfo.orderId, status: 'DA_THANH_TOAN' }).subscribe((res: any) => {
        if (res.code === StatusResponse.OK) {
          this.notification.success('Thông báo', 'Thanh toán thành công');
        } else {
          this.notification.error('Thông báo', 'Thanh toán thất bại');
        }
      })
    }
  }

  formatCurrency(value: string): string {
    const num = parseInt(value || '0', 10) / 100; // VNPAY amount nhân 100
    return num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return `${dateStr.substring(6, 8)}/${dateStr.substring(4, 6)}/${dateStr.substring(0, 4)} ${dateStr.substring(8, 10)}:${dateStr.substring(10, 12)}`;
  }

  getStatus(responseCode: string, transactionStatus: string): string {
    return (responseCode === '00' && transactionStatus === '00') ? 'Thành công' : 'Thất bại';
  }
}