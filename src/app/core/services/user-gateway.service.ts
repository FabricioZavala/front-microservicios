import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3005/users-gateway';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  // Obtener un usuario por ID
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Crear un usuario
  create(data: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, data);
  }

  // Actualizar un usuario
  update(id: string, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/${id}`, data);
  }

  // Eliminar un usuario
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
