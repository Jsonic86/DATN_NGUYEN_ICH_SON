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
    this.paymentService.create().subscribe(res => {
      window.location.href = res.paymentUrl;
    });
  }
}
