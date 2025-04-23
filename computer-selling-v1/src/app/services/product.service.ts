import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }

  getAllProducts(payload: any = {}): Observable<any> {
    return this.apiService.get('products', payload);
  }
  getAllProductsByCategory(payload: any = {}): Observable<any> {
    return this.apiService.get('products/by-category', payload);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete('products', id);
  }
  getById(id: string): Observable<any> {
    return this.apiService.getById(`products/detail`, id);
  }
  createProduct(payload: any): Observable<any> {
    const formData = new FormData();
    Object.keys(payload).forEach(key => {
      const value = payload[key];
      if (key === 'image' && value && value instanceof File) {
        formData.append('image', value, value.name);
      }
      else if (value !== undefined) {
        formData.append(key, value);
      }
    });
    return this.apiService.post('products', formData, 'multipart/form-data');
  }
  updateProduct(payload: any): Observable<any> {
    const formData = new FormData();
    // Duyệt qua từng trường trong payload và thêm vào formData
    Object.keys(payload).forEach(key => {
      const value = payload[key];

      // Nếu là image (vì image là một đối tượng)
      if (key === 'image' && value && value instanceof File) {  // Kiểm tra nếu value là File
        // Thêm tên của ảnh vào formData
        formData.append('image', value, value.name);
        console.log(`Appending image: ${key} = ${value.name}`);
      }
      // Nếu là các trường khác như productName, price, stockQuantity
      else if (value !== undefined) {
        formData.append(key, value);
        console.log(`Appending: ${key} = ${value}`);
      }
    });

    return this.apiService.put('products', formData, 'multipart/form-data');
  }




}
