import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../../core/services/user-gateway.service';
import { User } from '../../../../../core/interfaces/user.interface';
import { CreateEditUsersComponent } from '../../forms/create-edit-users/create-edit-users/create-edit-users.component';
import { ViewUsersComponent } from '../../forms/view-users/view-users/view-users.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';
@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  collectionSize: number = 0;
  page: number = 1;
  limit: number = 10;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private filterService: FilterCommunicationService
  ) {}

  ngOnInit(): void {
    // Cargar usuarios al iniciar
    this.loadUsers();

    // Escuchar cambios en los filtros
    this.filterService.currentFilter.subscribe((filters) => {
      if (filters) {
        this.page = 1; // Reiniciar a la primera página al aplicar filtros
        this.loadUsers(filters);
      }
    });
  }

  loadUsers(filters: any = {}): void {
    this.loading = true;
    const params = {
      page: this.page,
      limit: this.limit,
      fullName: filters.fullName || '', // Agregar fullName a los parámetros
      email: filters.email || '',
      status: filters.status || '',
      roles: filters.roles || '',
    };

    this.userService.getAll(params).subscribe({
      next: (response) => {
        this.users = response.data.map((user) => ({
          ...user,
          equipmentNames: user.equipments?.length
            ? user.equipments.map((equipment) => equipment.name).join(', ')
            : 'Sin equipos',
        }));
        this.collectionSize = response.totalCount;
        this.loading = false;
      },
      error: () => {
        Swal.fire('Error', 'Error al cargar los usuarios.', 'error');
        this.loading = false;
      },
    });
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
    const modalRef = this.modalService.open(CreateEditUsersComponent, {
      size: 'lg',
    });
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

  downloadAsPDF(): void {
    const doc = new jsPDF();

    // Título del PDF
    const title = 'Reporte de Usuarios';
    const date = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    doc.setFontSize(18);
    doc.text(title, 14, 15);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Fecha de generación: ${date}`, 14, 22);

    // Datos de la tabla
    const tableColumn = [
      'Nombre Completo',
      'Email',
      'Estado',
      'Roles',
      'Equipos Asignados',
    ];
    const tableRows = this.users.map((user) => [
      user.fullName || 'Sin nombre',
      user.email,
      user.status,
      user.roles?.join(', ') || 'Sin roles',
      user.equipmentNames || 'Sin equipos',
    ]);

    // Configuración de la tabla
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Espaciado inicial
      styles: {
        fontSize: 10,
        halign: 'center', // Alinear el contenido al centro
        lineColor: [200, 200, 200], // Bordes suaves
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [50, 50, 50], // Color de fondo de la cabecera
        textColor: [255, 255, 255], // Color del texto en la cabecera
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Color alternativo para las filas
      },
      bodyStyles: {
        textColor: [50, 50, 50], // Color del texto de las filas
      },
      margin: { top: 20 },
    });

    // Pie de página
    const pageCount = doc.internal.pages.length - 1; // Calcular número de páginas
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    doc.save('Reporte_Usuarios.pdf');
  }

  downloadAsExcel(): void {
    const dataToExport = this.users.map((user) => ({
      'Nombre Completo': user.fullName || 'Sin nombre',
      Email: user.email,
      Estado: user.status,
      Roles: user.roles?.join(', ') || 'Sin roles',
      'Equipos Asignados': user.equipmentNames || 'Sin equipos',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

    XLSX.writeFile(workbook, 'Reporte_Usuarios.xlsx');
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadUsers();
  }

  // Cambiar límite
  onLimitChange(limit: number): void {
    this.limit = limit;
    this.page = 1; // Reiniciar a la primera página
    this.loadUsers();
  }

  reloadTable(): void {
    this.filterService.currentFilter.subscribe((filters) => {
      this.loadUsers(filters);
    });
  }
}
