import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Equipment } from '../../../../../core/interfaces/equipment.interface';
import { EquipmentService } from '../../../../../core/services/equipment.service';
import { CreateEditEquipmentComponent } from '../../forms/create-edit-equipment/create-edit-equipment/create-edit-equipment.component';
import { ViewEquipmentComponent } from '../../forms/view-equipment/view-equipment/view-equipment.component';


@Component({
  selector: 'app-table-equipment',
  templateUrl: './table-equipment.component.html',
  styleUrls: ['./table-equipment.component.scss'],
})
export class TableEquipmentComponent implements OnInit {
  equipments: Equipment[] = [];
  isLoading = false;
  collectionSize = 0;
  page = 1;
  limit = 10;

  constructor(
    private equipmentService: EquipmentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  // Cargar equipos
  loadEquipments(): void {
    this.isLoading = true;
    this.equipmentService.getAll().subscribe({
      next: (data) => {
        this.equipments = data;
        this.collectionSize = data.length; // Ajustar si hay paginación
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al cargar los equipos:', err);
      },
    });
  }

  // Recargar tabla
  reloadTable(): void {
    this.loadEquipments();
  }

  // Abrir modal de creación/edición
  openCreateEditModal(equipment?: Equipment): void {
    const modalRef = this.modalService.open(CreateEditEquipmentComponent, {
      size: 'lg',
    });
    
    if (equipment) {
      modalRef.componentInstance.equipment = equipment;
    }
  
    modalRef.componentInstance.refreshTable.subscribe(() => {
      this.loadEquipments(); // Recargar la tabla cuando se emita el evento
    });
  
    modalRef.result.catch(() => {}); // Opcional: manejar cierres del modal sin acción
  }
  

  openViewModal(equipment: Equipment): void {
    const modalRef = this.modalService.open(ViewEquipmentComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.equipment = equipment;
  }

  deleteEquipment(equipmentId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el equipo permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.equipmentService.delete(equipmentId).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El equipo ha sido eliminado.', 'success');
            this.loadEquipments();
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar el equipo.', 'error');
            console.error('Error al eliminar el equipo:', err);
          },
        });
      }
    });
  }

  // Cambiar página
  onPageChange(page: number): void {
    this.page = page;
    this.loadEquipments();
  }

  // Cambiar límite
  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadEquipments();
  }
}
