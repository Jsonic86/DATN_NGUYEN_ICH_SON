import { HttpBackend, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/env';
import { Observable } from 'rxjs';
import { getCookie } from '../core/utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = '';
  public assetUrl = '';
  private readonly GET_METHOD = 'GET';
  private readonly POST_METHOD = 'POST';
  // private readonly Api_key = "secret_key";
  private readonly CONTENT_TYPE_APP_JSON = 'application/json';
  private Api_key_Value = '';
  public accessToken: String = '';
  constructor(private http: HttpClient, handler: HttpBackend) {
    this.baseUrl = environment.apiUrl;
    const _token = getCookie('token');
    if (_token) {
      this.Api_key_Value = _token;
    }
  }
  /**
 * Wrapper http get method, returns the body of the response
 * as an untyped JSON object by default
 * @param path service uri
 * @param contentType accept content-type
 * @param Authorization accept token
 */
  public login_api(
    path: string,
    body: Object = {},
    contentType: string = ''
  ): Observable<any> {
    if (!contentType) {
      contentType = this.CONTENT_TYPE_APP_JSON;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
      }),
    };
    return this.http.post(
      `${this.baseUrl}/${path}`,
      JSON.stringify(body),
      httpOptions
    );
  }
  public post(
    path: string,
    body: Object = {},
    contentType: string = ''
  ): Observable<any> {
    if (body instanceof FormData) {
      contentType = '';
    } else if (!contentType) {
      contentType = this.CONTENT_TYPE_APP_JSON;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Api_key_Value}`,
      }),
    };


    return this.http.post(
      `${this.baseUrl}/${path}`,
      body,
      httpOptions
    );
  }
  public put(
    path: string,
    body: FormData | Object = {},
    contentType: string = ''
  ): Observable<any> {
    // Nếu body là FormData, không cần thiết phải thay đổi Content-Type
    if (body instanceof FormData) {
      contentType = '';  // Trình duyệt sẽ tự động thiết lập Content-Type cho FormData
    } else if (!contentType) {
      contentType = this.CONTENT_TYPE_APP_JSON;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.Api_key_Value}`,
      }),
    };

    // Nếu là FormData, không cần JSON.stringify
    return this.http.put(
      `${this.baseUrl}/${path}`,
      body, // Truyền trực tiếp FormData hoặc Object
      httpOptions
    );
  }
  public get(
    path: string,
    payload?: any,
    contentType: string = ''
  ): Observable<any> {
    if (!contentType) {
      contentType = this.CONTENT_TYPE_APP_JSON;
    }

    let params = new HttpParams();


    if (payload) {
      Object.keys(payload).forEach(key => {
        params = params.set(key, payload[key]);
      });
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        Authorization: `Bearer ${this.Api_key_Value}`,
      }),
      params: params
    };

    return this.http.get(`${this.baseUrl}/${path}`, httpOptions);
  }
  public getById(
    path: string,
    id: string,
    contentType: string = ''
  ): Observable<any> {
    if (!contentType) {
      contentType = this.CONTENT_TYPE_APP_JSON;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        Authorization: `Bearer ${this.Api_key_Value}`,
      }),
      params: new HttpParams()
        .set('id', id.toString())
    };
    return this.http.get(
      `${this.baseUrl}/${path}`,
      httpOptions
    );
  }
  public delete(
    path: string,
    id: string,
    contentType: string = ''
  ): Observable<any> {
    if (!contentType) {
      contentType = this.CONTENT_TYPE_APP_JSON;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        Authorization: `Bearer ${this.Api_key_Value}`,
      }),
      params: new HttpParams()
        .set('id', id.toString())
    };

    return this.http.delete(
      `${this.baseUrl}/${path}`,
      httpOptions,
    );
  }
}
