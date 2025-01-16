import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../../core/services/user-gateway.service';
import { User } from '../../../../../core/interfaces/user.interface';
import { CreateEditUsersComponent } from '../../forms/create-edit-users/create-edit-users/create-edit-users.component';
import { ViewUsersComponent } from '../../forms/view-users/view-users/view-users.component';


@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  collectionSize: number = 0; // Tamaño de la colección para paginación

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Cargar usuarios
  loadUsers(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.collectionSize = data.length; // Tamaño total para paginación
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'Error al cargar los usuarios.', 'error');
        this.loading = false;
      },
    });
  }

  // Recargar tabla
  reloadTable(): void {
    this.loadUsers();
  }

  // Eliminar usuario
  deleteUser(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado.', 'success');
            this.reloadTable();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          },
        });
      }
    });
  }

  // Abrir modal para crear o editar usuario
  openCreateEditModal(user?: User): void {
    const modalRef = this.modalService.open(CreateEditUsersComponent, { size: 'lg' });
    modalRef.componentInstance.user = user; // Pasar usuario al modal

    modalRef.result.then(() => {
      this.reloadTable();
    });
  }

  // Abrir modal para ver usuario
  openViewModal(user: User): void {
    const modalRef = this.modalService.open(ViewUsersComponent, { size: 'lg' });
    modalRef.componentInstance.user = user; // Pasar usuario al modal
  }

  // Controlar paginación
  onPageChange(page: number): void {
  }

  onLimitChange(limit: number): void {
  }
}
