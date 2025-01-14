import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesUsersComponent } from './pages/pages-users/pages-users.component';


const Usersroutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PagesUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(Usersroutes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
