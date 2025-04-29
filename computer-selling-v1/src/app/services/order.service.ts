import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CommonGetByIdResponse, CommonResponse } from '../model/response/common.response';
import { Order } from '../model/response/order.response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private apiService: ApiService) { }
  createOrder(payload: any): Observable<CommonGetByIdResponse<Order>> {
    return this.apiService.post('orders/create', payload)
  }
  getAllOrders(payload: any = {}): Observable<CommonResponse<Order>> {
    return this.apiService.get('orders', payload)
  }
  updateStatus(id: string, status: string): Observable<CommonGetByIdResponse<Order>> {
    const payload = new URLSearchParams();
    payload.set('id', id);
    payload.set('status', status);
    return this.apiService.post(`orders/update-status?${payload.toString()}`);
  }
}
