import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('../../pages/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'equipment',
    loadChildren: () =>
      import('../../pages/equipment/equipment.module').then(
        (m) => m.EquipmentModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../../pages/profile/profile.module').then((m) => m.ProfileModule),
  },
];
