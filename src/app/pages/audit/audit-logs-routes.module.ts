import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesAuditLogsComponent } from './pages/pages-audit-logs/pages-audit-logs.component';



const AuditLogsroutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PagesAuditLogsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(AuditLogsroutes)],
  exports: [RouterModule],
})
export class AuditLogsRoutingModule {}
