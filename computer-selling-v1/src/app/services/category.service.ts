import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiService: ApiService) { }

  getAllCategories(payload: any = {}): Observable<any> {
    return this.apiService.get('categories', payload);
  }
  getById(id: string): Observable<any> {
    return this.apiService.getById(`categories/detail`, id);
  }
  createCategory(payload: any): Observable<any> {
    return this.apiService.post('categories', payload);
  }
  updateCategory(payload: any): Observable<any> {
    return this.apiService.put('categories', payload);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete('categories', id);
  }
}
