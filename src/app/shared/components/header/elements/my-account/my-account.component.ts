import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGatewayService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  public userName: string = 'Cargando...';
  public userRole: string = 'Cargando...';

  constructor(private router: Router, private authService: AuthGatewayService) {}

  ngOnInit() {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.userName = user.fullName || user.username || 'Usuario';
        this.userRole = user.roles?.join(', ') || 'Sin rol';
      },
      error: (err) => {
        console.error('Error al obtener usuario logueado:', err);
        this.userName = 'Usuario no autenticado';
        this.userRole = 'Rol no definido';
      },
    });
  }

  logoutFunc() {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('auth/login');
  }
}
