import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';

@Component({
  selector: 'app-filter-audit-logs',
  templateUrl: './filter-audit-logs.component.html',
  styleUrls: ['./filter-audit-logs.component.scss'],
})
export class FilterAuditLogsComponent implements OnInit {
  auditLogFilterForm!: FormGroup;
  isExpanded = false;
  actions = ['update', 'delete', 'create']; // Opciones para Acción
  entities = ['user', 'category', 'equipment']; // Opciones para Entidad

  constructor(
    private fb: FormBuilder,
    private filterCommunicationService: FilterCommunicationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.auditLogFilterForm = this.fb.group({
      action: [''],
      entity: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  sendFilter(): void {
    const fv = this.auditLogFilterForm.value;

    const filters = {
      action: fv.action || '',
      entity: fv.entity || '',
      startDate: fv.startDate || '',
      endDate: fv.endDate || '',
    };

    this.filterCommunicationService.changeFilter(filters);
  }

  resetFilter(): void {
    this.auditLogFilterForm.reset({
      action: '',
      entity: '',
      startDate: '',
      endDate: '',
    });

    const resetFilters = {
      action: '',
      entity: '',
      startDate: '',
      endDate: '',
    };

    this.filterCommunicationService.changeFilter(resetFilters);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
