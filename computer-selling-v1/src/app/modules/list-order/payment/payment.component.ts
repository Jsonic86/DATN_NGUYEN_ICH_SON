import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input() data: any = null;
  selectedMethod = 'CHUYEN_KHOAN';
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void { }
  onConfirm() {
    const payload = {
      orderInfo: this.data.orderId,
      amount: this.data.totalAmount,
      returnUrl: 'http://localhost:4200/payment-success',
    }
    this.paymentService.create(payload).subscribe(res => {
      window.location.href = res.result;
    });
  }
}
