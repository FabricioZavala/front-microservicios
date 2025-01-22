import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesAuditLogsComponent } from './pages/pages-audit-logs/pages-audit-logs.component';
import { SharedModule } from '../../shared/shared.module';
import { TableAuditLogsComponent } from './components/tables/table-audit-logs/table-audit-logs.component';
import { AuditLogsRoutingModule } from './audit-logs-routes.module';
import { ViewAuditLogsComponent } from './components/forms/view-audit-logs/view-audit-logs/view-audit-logs.component';
import { FilterAuditLogsComponent } from './components/filters/filter-audit-logs/filter-audit-logs.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    PagesAuditLogsComponent,
    TableAuditLogsComponent,
    ViewAuditLogsComponent,
    FilterAuditLogsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuditLogsRoutingModule,
    NgSelectModule,
  ]
})
export class AuditLogsModule { }
