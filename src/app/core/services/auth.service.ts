// auth-gateway.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGatewayService {
  private readonly baseUrl = `${environment.gatewayUrl}/auth-gateway`;

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

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getCurrentUserId(): string | null {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return null;
    }
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    return payload.sub || null;
  }

  getCurrentUserRoles(): string[] {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return [];
    }
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    return payload.roles || [];
  }

  getLoggedInUser(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Token no encontrado en localStorage.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get(`${this.baseUrl}/me`, { headers });
  }
}
