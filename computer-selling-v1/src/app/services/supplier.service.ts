import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private apiService: ApiService) { }

  getAllsuppliers(payload: any = {}): Observable<any> {
    return this.apiService.get('suppliers/search', payload);
  }
  getById(id: string): Observable<any> {
    return this.apiService.getById(`suppliers/detail`, id);
  }
  createSupplier(payload: any): Observable<any> {
    return this.apiService.post('suppliers', payload);
  }
  updateSupplier(payload: any): Observable<any> {
    return this.apiService.put('suppliers', payload);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete('suppliers', id);
  }
}
