import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Category } from '../../../../../../core/interfaces/category.interface';
import { CategoryGatewayService } from '../../../../../../core/services/category-gateway.service';

@Component({
  selector: 'app-create-edit-categories',
  templateUrl: './create-edit-categories.component.html',
  styleUrls: ['./create-edit-categories.component.scss'],
})
export class CreateEditCategoriesComponent implements OnInit {
  @Input() category?: Category; // Recibirá la categoría para editar (si aplica)

  categoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryGatewayService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.category) {
      this.categoryForm.patchValue(this.category); // Cargar datos si está editando
    }
  }

  // Inicializar el formulario
  initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]],
      status: ['active', [Validators.required]],
    });
  }

  // Validar si el control tiene errores
  isControlInvalid(controlName: string): boolean {
    const control = this.categoryForm.get(controlName);
    return !!control?.invalid && (control.dirty || control.touched);
  }

  // Cerrar el modal
  closeModal(): void {
    this.activeModal.dismiss();
  }

  // Enviar el formulario
  onSubmit(): void {
    if (this.category) {
      // Actualizar categoría
      this.categoryService
        .updateCategory(this.category._id, this.categoryForm.value)
        .subscribe({
          next: () => {
            Swal.fire('Éxito', 'Categoría actualizada correctamente.', 'success');
            this.activeModal.close(true);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo actualizar la categoría.', 'error');
          },
        });
    } else {
      // Crear nueva categoría
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Categoría creada correctamente.', 'success');
          this.activeModal.close(true);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo crear la categoría.', 'error');
        },
      });
    }
  }
}
