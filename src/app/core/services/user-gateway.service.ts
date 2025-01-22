import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.gatewayUrl}/users-gateway`;

  constructor(private http: HttpClient) {}

  getAll(params: {
    page: number;
    limit: number;
  }): Observable<{ data: User[]; totalCount: number }> {
    return this.http.get<{ data: User[]; totalCount: number }>(
      `${this.baseUrl}`,
      { params }
    );
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, data);
  }

  update(id: string, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
