import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { ContentComponent } from './shared/components/layout/content/content.component';
import { FullComponent } from './shared/components/layout/full/full.component';
import { content } from './shared/routes/routes';
import { full } from './shared/routes/full.routes';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full', // Cambiado para redirigir al login si no hay autenticación
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ContentComponent,
    children: content,
  },
  {
    path: '',
    component: FullComponent,
    children: full,
  },
  {
    path: '**', // Manejo de rutas no existentes
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
