// auth-gateway.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGatewayService {
  private readonly baseUrl = 'http://localhost:3005/auth-gateway';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  update(userId: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/update/${userId}`, data);
  }
}
