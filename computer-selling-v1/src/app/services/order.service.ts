import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private apiService: ApiService) { }
  createOrder(payload: any): Observable<any> {
    return this.apiService.post('orders/create', payload)
  }
  getAllOrders(payload: any = {}): Observable<any> {
    return this.apiService.get('orders', payload)
  }

}
