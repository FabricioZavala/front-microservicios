import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesUsersComponent } from './pages/pages-users/pages-users.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesRoutingModule } from './users-routing.module';
import { TableUsersComponent } from './components/table/table-users/table-users.component';



@NgModule({
  declarations: [
    PagesUsersComponent,
    TableUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class UsersModule { }
