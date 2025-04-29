import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/env';
import { getCookie, setCookie } from '../core/utils';
import { LoginRequest } from '../model/request/login.request';
import { LoginResponse } from '../model/response/login.response';
import { CommonResponse } from '../model/response/common.response';
import { Route, Router } from '@angular/router';
import { ApiService } from './api.service';
import { RegisterResponse } from '../model/response/register.response';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subscribe(arg0: (res: any) => void) {
    throw new Error('Method not implemented.');
  }
  public baseUrl = '';
  public assetUrl = '';
  // private readonly Api_key = "secret_key";
  private readonly CONTENT_TYPE_APP_JSON = 'application/json';
  private Api_key_Value = '';
  public roles: string[] = [];
  public accessToken: string = '';
  constructor(private http: HttpClient, handler: HttpBackend, private router: Router, private apiService: ApiService) {
    this.baseUrl = environment.apiUrl;
    const _token = getCookie('token');
    if (_token) {
      this.Api_key_Value = _token;
    }
  }
  receiveToken(token: any) {
    this.Api_key_Value = token;
  }

  login(body: LoginRequest): Observable<CommonResponse<LoginResponse>> {

    return this.apiService.login_api(`auth/login`, body).pipe(
      tap((res: any) => {
        this.accessToken = res.result.token;
        const decoded: any = jwtDecode(this.accessToken);
        setCookie('token', res.result.token, decoded.exp);
        this.receiveToken(res.result.token);


        const roles: string[] = decoded.scope
          .split(" ") // Tách chuỗi thành mảng ["ROLE_ADMIN", "ROLE_USER"]
          .filter((role: string) => role.startsWith("ROLE_")); // Giữ lại các phần tử bắt đầu bằng "ROLE_"
        setCookie('roles', roles.join(", "));
        setCookie('userName', decoded.sub);
        this.redirectAfterLogin();
      })
    );
  }
  // myInfo(): Observable<CommonResponse<any>> {
  //   return this.apiService.get('users/myInfo').pipe(
  //     tap((res: any) => {
  //       res.result.roles.forEach((role: any) => {
  //         this.roles.push(role.name);
  //       });
  //     })
  //   );;
  // }
  register(body: any): Observable<CommonResponse<RegisterResponse>> {
    return this.apiService.login_api('users/register', body);
  }
  isLoggedIn(): boolean {
    const info = getCookie('token');
    if (info) {
      return true;
    }
    return false;
  }
  redirectAfterLogin() {
    const role: string[] = getCookie('roles')?.split(', ') || [];
    if (role.includes('ROLE_ADMIN')) {
      this.router.navigate(['/admin']); // Điều hướng admin
    } else {
      this.router.navigate(['/user/home']); // Điều hướng user
    }
  }
}
