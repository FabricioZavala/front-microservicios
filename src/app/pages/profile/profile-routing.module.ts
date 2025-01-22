import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesProfileComponent } from './pages/pages-profile/pages-profile.component';

const profileRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: PagesProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
