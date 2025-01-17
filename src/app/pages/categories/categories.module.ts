import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routes.module';
import { PagesCategoriesComponent } from './pages/pages-categories/pages-categories.component';
import { SharedModule } from '../../shared/shared.module';
import { TableCategoriesComponent } from './components/tables/table-categories/table-categories.component';
import { CreateEditCategoriesComponent } from './components/forms/create-edit-categories/create-edit-categories/create-edit-categories.component';
import { ViewCategoriesComponent } from './components/forms/view-categories/view-categories/view-categories.component';
import { FilterCategoriesComponent } from './components/filters/filter-categories/filter-categories.component';



@NgModule({
  declarations: [
    PagesCategoriesComponent,
    TableCategoriesComponent,
    CreateEditCategoriesComponent,
    ViewCategoriesComponent,
    FilterCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
  ]
})
export class CategoriesModule { }
