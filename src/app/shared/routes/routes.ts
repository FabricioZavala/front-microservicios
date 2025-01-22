import { Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'equipment',
    loadChildren: () =>
      import('../../pages/equipment/equipment.module').then(
        (m) => m.EquipmentModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../../pages/users/users.module').then((m) => m.UsersModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../../pages/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'audit',
    loadChildren: () =>
      import('../../pages/audit/audit-logs.module').then((m) => m.AuditLogsModule),
    canActivate: [AuthGuard]
  },
];
