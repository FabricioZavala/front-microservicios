import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../interfaces/equipment.interface';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  private readonly baseUrl = 'http://localhost:3005/equipment-gateway';

  constructor(private http: HttpClient) {}

  getAll(params?: { page?: number; limit?: number; name?: string; description?: string; status?: string; categoryName?: string }): Observable<{ data: Equipment[]; totalCount: number }> {
    return this.http.get<{ data: Equipment[]; totalCount: number }>(`${this.baseUrl}`, { params });
  }
  

  // Obtener un equipo por ID
  getById(id: string): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/${id}`);
  }

  // Crear un equipo
  create(data: Partial<Equipment>): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.baseUrl}`, data);
  }

  // Actualizar un equipo
  update(id: string, data: Partial<Equipment>): Observable<Equipment> {
    return this.http.patch<Equipment>(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar un equipo
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
