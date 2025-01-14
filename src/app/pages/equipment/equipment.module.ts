import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesEquipmentComponent } from './pages/pages-equipment/pages-equipment.component';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TableEquipmentComponent } from './components/table/table-equipment/table-equipment.component';



@NgModule({
  declarations: [
    PagesEquipmentComponent,
    TableEquipmentComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    SharedModule,
  ]
})
export class EquipmentModule { }
