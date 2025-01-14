import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DefaultComponent } from './default/default.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [DefaultComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
