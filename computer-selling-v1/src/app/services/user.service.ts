import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CommonResponse } from '../model/response/common.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getAllUsers(): Observable<any> {
    return this.apiService.get('users');
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete('users', id);
  }
  getById(id: string): Observable<any> {
    return this.apiService.getById(`users/detail`, id);
  }
  getInfo() {
    return this.apiService.get(`users/myInfo`);
  }
  updateEmployee(payload: any) {
    return this.apiService.post(`users/update-info`, payload);
  }
}
