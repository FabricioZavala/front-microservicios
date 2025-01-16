import { Component, OnInit } from '@angular/core';
import { AuthGatewayService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-card-info-user',
  templateUrl: './card-info-user.component.html',
  styleUrls: ['./card-info-user.component.scss'],
})
export class CardInfoUserComponent implements OnInit {
  public userName: string = 'Cargando...';
  public userEmail: string = 'Cargando...';
  public userRole: string = 'Cargando...';
  public username: string = 'Cargando...';
  public isActive: boolean | null = null;

  constructor(private authService: AuthGatewayService) {}

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.userName = user.fullName || 'No proporcionado';
        this.username = user.username || 'No proporcionado';
        this.userEmail = user.email || 'Correo no disponible';
        this.userRole = user.roles?.join(', ') || 'Sin rol';
        this.isActive = user.isActive;
      },
      error: (err) => {
        console.error('Error al obtener usuario logueado:', err);
      },
    });
  }

  getActiveStatus(): string {
    return this.isActive ? 'Activo' : 'Inactivo';
  }
}
