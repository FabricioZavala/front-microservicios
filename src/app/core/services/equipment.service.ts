import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../interfaces/equipment.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private readonly baseUrl = `${environment.gatewayUrl}/equipment-gateway`;

  constructor(private http: HttpClient) {}

  getAll(params?: {
    page?: number;
    limit?: number;
    name?: string;
    description?: string;
    status?: string;
    categoryName?: string;
  }): Observable<{ data: Equipment[]; totalCount: number }> {
    return this.http.get<{ data: Equipment[]; totalCount: number }>(
      `${this.baseUrl}`,
      { params }
    );
  }

  getById(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/${id}`);
  }

  create(data: Partial<Equipment>): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.baseUrl}`, data);
  }

  update(id: string, data: Partial<Equipment>): Observable<Equipment> {
    return this.http.patch<Equipment>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
