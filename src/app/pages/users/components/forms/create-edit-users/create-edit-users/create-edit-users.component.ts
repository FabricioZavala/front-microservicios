import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { User } from '../../../../../../core/interfaces/user.interface';
import { UserService } from '../../../../../../core/services/user-gateway.service';
import { Equipment } from '../../../../../../core/interfaces/equipment.interface';
import { EquipmentService } from '../../../../../../core/services/equipment.service';

@Component({
  selector: 'app-create-edit-users',
  templateUrl: './create-edit-users.component.html',
  styleUrls: ['./create-edit-users.component.scss'],
})
export class CreateEditUsersComponent implements OnInit {
  @Input() user?: User; // Usuario a editar (si existe)

  userForm: FormGroup;
  equipments: Equipment[] = [];
  selectedEquipments: Equipment[] = [];

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private equipmentService: EquipmentService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      fullName: [''],
      status: ['active', Validators.required],
      equipmentIds: [[]],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
    this.loadEquipments();
  }
  
  private loadEquipments(): void {
    this.equipmentService.getAll().subscribe({
      next: (data) => {
        this.equipments = data;
  
        // Marcar equipos seleccionados si el usuario ya tiene equipos
        if (this.user?.equipmentIds) {
          this.selectedEquipments = this.equipments.filter((equipment) =>
            this.user?.equipmentIds?.includes(equipment._id),
          );
  
          // Actualizar el formulario reactivo
          this.userForm.patchValue({
            equipmentIds: this.selectedEquipments.map((e) => e._id),
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar los equipos:', err);
      },
    });
  }
  

  isSelected(equipment: Equipment): boolean {
    return this.selectedEquipments.some((e) => e._id === equipment._id);
  }
  
  toggleSelection(equipment: Equipment): void {
    const index = this.selectedEquipments.findIndex((e) => e._id === equipment._id);
  
    if (index === -1) {
      this.selectedEquipments.push(equipment); // Agregar a seleccionados
    } else {
      this.selectedEquipments.splice(index, 1); // Quitar de seleccionados
    }
  
    // Actualizar el formulario reactivo
    this.userForm.patchValue({
      equipmentIds: this.selectedEquipments.map((e) => e._id),
    });
  }
  removeSelection(equipment: Equipment): void {
    this.selectedEquipments = this.selectedEquipments.filter((e) => e._id !== equipment._id);
  
    // Actualizar el formulario reactivo
    this.userForm.patchValue({
      equipmentIds: this.selectedEquipments.map((e) => e._id),
    });
  }
  
  
  // Verificar si un campo es inválido
  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!control?.invalid && (control.dirty || control.touched);
  }

  // Obtener mensaje de error de un campo
  getError(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido.';
    }
    if (control?.hasError('minlength')) {
      return `Debe tener al menos ${control.errors?.minlength.requiredLength} caracteres.`;
    }
    if (control?.hasError('email')) {
      return 'Debe ser un email válido.';
    }
    return '';
  }

  // Cerrar modal
  close(): void {
    this.activeModal.dismiss();
  }

  // Guardar cambios
  onSubmit(): void {
    if (this.userForm.invalid) return;

    const userData = this.userForm.value;

    if (this.user) {
      // Editar usuario
      this.userService.update(this.user._id, userData).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Usuario actualizado correctamente.', 'success');
          this.activeModal.close();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error');
        },
      });
    } else {
      // Crear nuevo usuario
      this.userService.create(userData).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Usuario creado correctamente.', 'success');
          this.activeModal.close();
        },
        error: () => {
          Swal.fire('Error', 'No se pudo crear el usuario.', 'error');
        },
      });
    }
  }
}
