import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CommonResponse } from '../model/response/common.response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private apiService: ApiService) { }

  getRevenueByMonth(payload: any = {}): Observable<CommonResponse<number>> {
    return this.apiService.get('orders/month', payload);
  }
}
