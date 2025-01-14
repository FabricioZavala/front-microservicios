import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryGatewayService {
  private readonly gatewayUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) {}

  // Método para obtener todas las categorías
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.gatewayUrl}/categories-gateway`);
  }

  // Método para crear una categoría
  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.gatewayUrl}/categories-gateway`, category);
  }

  // Método para actualizar una categoría
  updateCategory(id: string, category: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${this.gatewayUrl}/categories-gateway/${id}`, category);
  }

  // Método para eliminar una categoría
  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.gatewayUrl}/categories-gateway/${id}`);
  }
}
