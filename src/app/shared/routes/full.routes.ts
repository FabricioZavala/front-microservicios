import { Routes } from '@angular/router';

export const full: Routes = [
  // {
  //   path: 'error-page',
  //   loadChildren: () => import('../../pages/error/error.module').then(m => m.ErrorModule),
  // },
  {
    path: 'authentication',
    loadChildren: () => import('../../pages/auth/auth.module').then(m => m.AuthModule),
  },
  // {
  //   path: 'coming-soon',
  //   loadChildren: () => import('../../pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
  // },
  // {
  //   path: 'maintenance',
  //   loadChildren: () => import('../../pages/maintenance/maintenance.module').then(m => m.MaintenanceModule),
  // }
];
