import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesEquipmentComponent } from './pages/pages-equipment/pages-equipment.component';


const Equipmentroutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PagesEquipmentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(Equipmentroutes)],
  exports: [RouterModule],
})
export class EquipmentRoutingModule {}
