import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryGatewayService {
  private readonly baseUrl = environment.gatewayUrl;

  constructor(private http: HttpClient) {}

  getCategories(params: any = {}): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categories-gateway`, {
      params,
    });
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(
      `${this.baseUrl}/categories-gateway`,
      category
    );
  }

  updateCategory(
    id: string,
    category: Partial<Category>
  ): Observable<Category> {
    return this.http.patch<Category>(
      `${this.baseUrl}/categories-gateway/${id}`,
      category
    );
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/categories-gateway/${id}`
    );
  }
}
