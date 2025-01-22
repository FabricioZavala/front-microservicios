import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-audit-logs',
  templateUrl: './view-audit-logs.component.html',
  styleUrls: ['./view-audit-logs.component.scss'],
})
export class ViewAuditLogsComponent implements OnInit {
  @Input() log: any; // Recibe el log de auditoría desde el componente padre.

  detailsKeys: string[] = [];

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // Inicializar las claves de los detalles del log.
    if (this.log?.details) {
      this.detailsKeys = Object.keys(this.log.details);
    }
  }

  /**
   * Verifica si un valor es un objeto.
   * @param value - Valor a verificar.
   * @returns true si es un objeto, false en caso contrario.
   */
  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  /**
   * Obtiene las claves de un objeto.
   * @param obj - Objeto del cual extraer las claves.
   * @returns Array de claves del objeto.
   */
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }

  /**
   * Cierra el modal.
   */
  closeModal(): void {
    this.activeModal.dismiss();
  }
}
