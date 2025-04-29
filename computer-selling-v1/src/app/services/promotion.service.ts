import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CommonGetByIdResponse, CommonResponse } from '../model/response/common.response';
import { Promotion, PromotionById } from '../model/response/promotion.response';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private apiService: ApiService) { }

  getAllPromotions(payload: any = {}): Observable<CommonResponse<Promotion>> {
    return this.apiService.get('promotions', payload);
  }
  getById(id: string): Observable<CommonGetByIdResponse<PromotionById>> {
    return this.apiService.getById(`promotions/detail`, id);
  }
  createPromotion(payload: any): Observable<CommonGetByIdResponse<PromotionById>> {
    return this.apiService.post('promotions', payload);
  }
  updatePromotion(payload: any): Observable<CommonGetByIdResponse<PromotionById>> {
    return this.apiService.put('promotions', payload);
  }
  updateStatus(payload: any): Observable<CommonGetByIdResponse<any>> {
    return this.apiService.post('promotions/update-status', payload);
  }
}
