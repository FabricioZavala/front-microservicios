import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Equipment } from '../../../../../../core/interfaces/equipment.interface';
import { EquipmentService } from '../../../../../../core/services/equipment.service';
import { AuthGatewayService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-create-edit-users',
  templateUrl: './create-edit-users.component.html',
  styleUrls: ['./create-edit-users.component.scss'],
})
export class CreateEditUsersComponent implements OnInit {
  @Input() user?: any;

  userForm: FormGroup;
  equipments: Equipment[] = [];
  selectedEquipments: Equipment[] = [];
  rolesList = [
    { name: 'Usuario', value: 'user' },
    { name: 'Administrador', value: 'admin' },
  ];
  
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private authService: AuthGatewayService,
    private equipmentService: EquipmentService,
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      roles: [this.user?.roles || [], Validators.required],
      fullName: [''],
      status: [true, Validators.required],
      equipmentIds: [[]],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue({
        ...this.user,
        status: this.user.status === 'active',
      });
    }
    this.loadEquipments();
  }

  private loadEquipments(): void {
    this.equipmentService.getAll().subscribe({
      next: (response) => {
        this.equipments = response.data;
        if (this.user?.equipmentIds) {
          this.selectedEquipments = this.equipments.filter((equipment) =>
            this.user?.equipmentIds.includes(equipment._id),
          );
          this.userForm.patchValue({
            equipmentIds: this.selectedEquipments.map((e) => e._id),
          });
        }
      },
      error: (err) => console.error('Error al cargar los equipos:', err),
    });
  }

  isSelected(equipment: Equipment): boolean {
    return this.selectedEquipments.some((e) => e._id === equipment._id);
  }

  toggleSelection(equipment: Equipment): void {
    const index = this.selectedEquipments.findIndex((e) => e._id === equipment._id);
    if (index === -1) {
      this.selectedEquipments.push(equipment);
    } else {
      this.selectedEquipments.splice(index, 1);
    }
    this.userForm.patchValue({
      equipmentIds: this.selectedEquipments.map((e) => e._id),
    });
  }

  removeSelection(equipment: Equipment): void {
    this.selectedEquipments = this.selectedEquipments.filter((e) => e._id !== equipment._id);
    this.userForm.patchValue({
      equipmentIds: this.selectedEquipments.map((e) => e._id),
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!control?.invalid && (control.dirty || control.touched);
  }

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

  close(): void {
    this.activeModal.dismiss();
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const userData = this.userForm.value;
    userData.status = userData.status ? 'active' : 'inactive';

    if (this.user) {
      this.authService.update(this.user._id, userData).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Usuario actualizado correctamente.', 'success');
          this.activeModal.close();
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar el usuario.', 'error'),
      });
    } else {
      this.authService.register(userData).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Usuario creado correctamente.', 'success');
          this.activeModal.close();
        },
        error: () => Swal.fire('Error', 'No se pudo crear el usuario.', 'error'),
      });
    }
  }
}
