import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthGatewayService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthGatewayService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const requiredRoles = route.data['roles'] as string[];
    const userRoles = this.authService.getCurrentUserRoles();

    if (requiredRoles.some((role) => userRoles.includes(role))) {
      return true;
    }
    return this.router.createUrlTree(['/auth/login']);
  }
}
