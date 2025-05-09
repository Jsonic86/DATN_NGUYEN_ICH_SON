import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private apiService: ApiService) { }

  create(payloads: any): Observable<any> {
    return this.apiService.get('payments/create-payment', payloads);
  }
  updateSatus(payload: any = {}): Observable<any> {
    const queryParams = new URLSearchParams();
    Object.keys(payload).forEach(key => {
      queryParams.append(key, payload[key]);
    });
    return this.apiService.post(`payments/update-status?${queryParams.toString()}`);
  }
}
