import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apiService: ApiService) { }

  create(): Observable<any> {
    return this.apiService.post('payments/create-vnpay', {
      orderId: "ORDER123",
      amount: 10000,
      returnUrl: "http://localhost:4200/user/home"
    });
  }
}
