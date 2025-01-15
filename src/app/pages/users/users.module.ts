import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesUsersComponent } from './pages/pages-users/pages-users.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesRoutingModule } from './users-routing.module';
import { TableUsersComponent } from './components/table/table-users/table-users.component';
import { CreateEditUsersComponent } from './components/forms/create-edit-users/create-edit-users/create-edit-users.component';
import { ViewUsersComponent } from './components/forms/view-users/view-users/view-users.component';



@NgModule({
  declarations: [
    PagesUsersComponent,
    TableUsersComponent,
    CreateEditUsersComponent,
    ViewUsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class UsersModule { }
