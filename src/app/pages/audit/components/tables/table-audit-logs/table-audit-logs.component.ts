import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuditLog } from '../../../../../core/interfaces/audit-log.interface';
import { AuditLogGatewayService } from '../../../../../core/services/audit-log-gateway.service';
import { ViewAuditLogsComponent } from '../../forms/view-audit-logs/view-audit-logs/view-audit-logs.component';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';
;

@Component({
  selector: 'app-table-audit-logs',
  templateUrl: './table-audit-logs.component.html',
  styleUrls: ['./table-audit-logs.component.scss'],
})
export class TableAuditLogsComponent implements OnInit {
  auditLogs: AuditLog[] = [];
  isLoading: boolean = false;
  page: number = 1;
  limit: number = 10;
  collectionSize: number = 0;
  filters: { action?: string; entity?: string; categoryName?: string; startDate?: string; endDate?: string } = {};


  constructor(
    private auditLogService: AuditLogGatewayService,
    private modalService: NgbModal,
    private filterService: FilterCommunicationService
  ) {}

  ngOnInit(): void {
    this.loadAuditLogs();

    this.filterService.currentFilter.subscribe((filter) => {
      if (filter) {
        this.filters = filter;
        this.page = 1;
        this.loadAuditLogs();
      }
    });
  }

  loadAuditLogs(): void {
    this.isLoading = true;

    const params = {
      page: this.page,
      limit: this.limit,
      ...this.filters,
    };

    this.auditLogService.getAuditLogs(params).subscribe({
      next: (response) => {
        this.auditLogs = response.data;
        this.collectionSize = response.totalCount;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
  

  reloadTable(): void {
    this.loadAuditLogs();
  }

  viewDetails(log: AuditLog): void {
    const modalRef = this.modalService.open(ViewAuditLogsComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.log = log;
  }

  onPageChange(page: number): void {
    console.log('Cambiando a la página:', page);
    this.page = page;
    this.loadAuditLogs();
  }
  

  onLimitChange(limit: number): void {
    console.log('Cambiando límite de resultados por página:', limit);
    this.limit = limit;
    this.page = 1;
    this.loadAuditLogs();
  }
}
