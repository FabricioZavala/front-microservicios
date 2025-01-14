import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesCategoriesComponent } from './pages/pages-categories/pages-categories.component';


const Categoriesroutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PagesCategoriesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(Categoriesroutes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
