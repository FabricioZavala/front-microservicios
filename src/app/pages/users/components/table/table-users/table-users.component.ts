import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../core/services/user-gateway.service';
import { User } from '../../../../../core/interfaces/user.interface';


@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar usuarios
  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los usuarios.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  // Eliminar usuario
  deleteUser(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.delete(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u._id !== id);
        },
        error: (err) => {
          this.error = 'Error al eliminar el usuario.';
          console.error(err);
        },
      });
    }
  }
}
