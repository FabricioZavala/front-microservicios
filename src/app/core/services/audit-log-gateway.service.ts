import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog } from '../interfaces/audit-log.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuditLogGatewayService {
  private readonly baseUrl = `${environment.gatewayUrl}/auth-gateway/audit-logs`;

  constructor(private http: HttpClient) {}

  getAuditLogs(params: { page: number; limit: number; [key: string]: any }): Observable<{ data: AuditLog[]; totalCount: number }> {
    console.log('Enviando parámetros a backend:', params);
    return this.http.get<{ data: AuditLog[]; totalCount: number }>(this.baseUrl, { params });
  }
}
