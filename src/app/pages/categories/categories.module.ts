import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routes.module';
import { PagesCategoriesComponent } from './pages/pages-categories/pages-categories.component';
import { SharedModule } from '../../shared/shared.module';
import { TableCategoriesComponent } from './components/tables/table-categories/table-categories.component';



@NgModule({
  declarations: [
    PagesCategoriesComponent,
    TableCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
  ]
})
export class CategoriesModule { }
