import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CategoryGatewayService } from '../../../../../../core/services/category-gateway.service';
import { Category } from '../../../../../../core/interfaces/category.interface';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss'],
})
export class ViewCategoriesComponent implements OnInit {
  @Input() categoryId!: string;
  category: Category | null = null;

  constructor(
    private activeModal: NgbActiveModal,
    private categoryService: CategoryGatewayService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.category = categories.find(
          (cat: Category) => cat._id.trim() === this.categoryId.trim()
        ) || null;

        if (!this.category) {
          Swal.fire(
            'No encontrado',
            'No se encontró la categoría solicitada. Asegúrate de que el ID sea correcto.',
            'error'
          );
          this.closeModal();
        }
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
        Swal.fire(
          'Error',
          'No se pudo cargar la información de las categorías. Por favor, intenta de nuevo más tarde.',
          'error'
        );
        this.closeModal();
      },
    });
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
