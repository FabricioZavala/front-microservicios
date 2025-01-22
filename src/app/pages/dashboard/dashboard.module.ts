import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DefaultComponent } from './pages-dashboard/default.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CardCategoriesComponent } from './components/card-categories/card-categories/card-categories.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardEquipmentComponent } from './components/card-equipment/card-equipment/card-equipment.component';
import { CardUsersComponent } from './components/card-users/card-users/card-users.component';
import { CardUsersEquipmentComponent } from './components/card-users-equipment/card-users-equipment/card-users-equipment.component';

@NgModule({
  declarations: [DefaultComponent, CardCategoriesComponent, CardEquipmentComponent, CardUsersComponent, CardUsersEquipmentComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule,
    NgApexchartsModule
  ],
})
export class DashboardModule {}
