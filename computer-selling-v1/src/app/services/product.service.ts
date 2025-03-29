import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }

  getAllProducts(): Observable<any> {
    return this.apiService.get('products');
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete('products', id);
  }
  getById(id: string): Observable<any> {
    return this.apiService.getById(`products/detail`, id);
  }
}
