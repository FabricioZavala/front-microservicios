import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesEquipmentComponent } from './pages/pages-equipment/pages-equipment.component';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TableEquipmentComponent } from './components/table/table-equipment/table-equipment.component';
import { CreateEditEquipmentComponent } from './components/forms/create-edit-equipment/create-edit-equipment/create-edit-equipment.component';
import { ViewEquipmentComponent } from './components/forms/view-equipment/view-equipment/view-equipment.component';
import { FilterEquipmentComponent } from './components/filters/filter-equipment/filter-equipment.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    PagesEquipmentComponent,
    TableEquipmentComponent,
    CreateEditEquipmentComponent,
    ViewEquipmentComponent,
    FilterEquipmentComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    SharedModule,
    NgSelectModule
  ]
})
export class EquipmentModule { }
