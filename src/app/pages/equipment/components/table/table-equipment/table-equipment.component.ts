import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../../../../core/services/equipment.service';
import { Equipment } from '../../../../../core/interfaces/equipment.interface';


@Component({
  selector: 'app-table-equipment',
  templateUrl: './table-equipment.component.html',
  styleUrls: ['./table-equipment.component.scss']
})
export class TableEquipmentComponent implements OnInit {
  equipments: Equipment[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  // Cargar equipos
  loadEquipments(): void {
    this.loading = true;
    this.error = null;
    this.equipmentService.getAll().subscribe({
      next: (data) => {
        this.equipments = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los equipos.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  // Eliminar equipo
  deleteEquipment(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este equipo?')) {
      this.equipmentService.delete(id).subscribe({
        next: () => {
          this.equipments = this.equipments.filter(e => e._id !== id);
        },
        error: (err) => {
          this.error = 'Error al eliminar el equipo.';
          console.error(err);
        },
      });
    }
  }
}
