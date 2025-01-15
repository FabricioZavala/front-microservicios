import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipmentService } from '../../../../../../core/services/equipment.service';
import { Equipment } from '../../../../../../core/interfaces/equipment.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.scss'],
})
export class ViewEquipmentComponent implements OnInit {
  @Input() equipmentId!: string; // ID del equipo a visualizar
  equipment?: Equipment; // Detalle del equipo
  loading: boolean = false;

  constructor(
    private activeModal: NgbActiveModal,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {
    this.loadEquipment();
  }

  // Cargar la información del equipo
  loadEquipment(): void {
    this.loading = true;
    this.equipmentService.getById(this.equipmentId).subscribe({
      next: (equipment) => {
        this.equipment = equipment;
        this.loading = false;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar la información del equipo.', 'error');
        console.error('Error al cargar equipo:', err);
        this.loading = false;
        this.closeModal();
      },
    });
  }

  // Devuelve clases según el estado del equipo
  getStatusClass(status: string): string {
    return {
      available: 'text-success',
      'in-use': 'text-warning',
      maintenance: 'text-danger',
    }[status] || 'text-muted';
  }

  // Cierra el modal
  closeModal(): void {
    this.activeModal.dismiss();
  }
}
