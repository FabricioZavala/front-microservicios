import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'; // Importar EventEmitter
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EquipmentService } from '../../../../../../core/services/equipment.service';
import { CategoryGatewayService } from '../../../../../../core/services/category-gateway.service';
import { Equipment } from '../../../../../../core/interfaces/equipment.interface';
import { Category } from '../../../../../../core/interfaces/category.interface';

@Component({
  selector: 'app-create-edit-equipment',
  templateUrl: './create-edit-equipment.component.html',
  styleUrls: ['./create-edit-equipment.component.scss'],
})
export class CreateEditEquipmentComponent implements OnInit {
  @Input() equipment?: Equipment; // Equipo a editar
  @Output() refreshTable = new EventEmitter<void>(); // Emitir evento para actualizar la tabla
  equipmentForm!: FormGroup;
  categories: Category[] = []; // Lista de categorías

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private equipmentService: EquipmentService,
    private categoryService: CategoryGatewayService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }

  // Inicializar el formulario
  initializeForm(): void {
    this.equipmentForm = this.fb.group({
      name: [
        this.equipment?.name || '',
        [Validators.required, Validators.maxLength(100)],
      ],
      description: [
        this.equipment?.description || '',
        [Validators.maxLength(500)],
      ],
      status: [this.equipment?.status || 'available', [Validators.required]],
      categoryId: [this.equipment?.categoryId || '', [Validators.required]],
    });
  }

  // Cargar categorías
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });
  }

  // Verificar si el campo es inválido
  isInvalid(field: string): boolean {
    const control = this.equipmentForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  // Obtener mensaje de error
  getErrorMessage(field: string): string {
    const control = this.equipmentForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio.';
    }
    if (control?.hasError('maxlength')) {
      return 'Excede el máximo de caracteres permitidos.';
    }
    return '';
  }

  // Guardar equipo
  saveEquipment(): void {
    if (this.equipmentForm.invalid) {
      return;
    }

    const equipmentData: Partial<Equipment> = this.equipmentForm.value;

    if (this.equipment) {
      // Actualizar equipo
      this.equipmentService
        .update(this.equipment._id, equipmentData)
        .subscribe({
          next: () => {
            Swal.fire(
              'Actualizado',
              'El equipo se actualizó correctamente.',
              'success'
            );
            this.closeModal(true);
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo actualizar el equipo.', 'error');
            console.error('Error al actualizar el equipo:', err);
          },
        });
    } else {
      // Crear equipo
      this.equipmentService.create(equipmentData).subscribe({
        next: () => {
          Swal.fire('Creado', 'El equipo se creó correctamente.', 'success');
          this.closeModal(true);
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo crear el equipo.', 'error');
          console.error('Error al crear el equipo:', err);
        },
      });
    }
  }

  // Cerrar modal
  closeModal(updated: boolean = false): void {
    this.activeModal.dismiss();
    if (updated) {
      this.refreshTable.emit(); // Emitir evento para actualizar la tabla
    }
  }
}
