import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Category } from '../../../../../core/interfaces/category.interface';
import { CategoryGatewayService } from '../../../../../core/services/category-gateway.service';
import { CreateEditCategoriesComponent } from '../../forms/create-edit-categories/create-edit-categories/create-edit-categories.component';
import { ViewCategoriesComponent } from '../../forms/view-categories/view-categories/view-categories.component';


@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.scss'],
})
export class TableCategoriesComponent implements OnInit {
  categories: Category[] = [];
  isLoading: boolean = false;

  constructor(
    private categoryService: CategoryGatewayService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: () => {
        Swal.fire('Error', 'No se pudieron cargar las categorías.', 'error');
        this.isLoading = false;
      },
    });
  }

  reloadTable(): void {
    this.loadCategories();
  }

  openCreateEditModal(category?: Category): void {
    const modalRef = this.modalService.open(CreateEditCategoriesComponent, {
      size: 'lg',
    });
    if (category) {
      modalRef.componentInstance.category = category;
    }
    modalRef.result.then(
      () => this.loadCategories(),
      () => {}
    );
  }

  openViewModal(category: Category): void {
    const modalRef = this.modalService.open(ViewCategoriesComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.category = category;
  }

  deleteCategory(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Categoría eliminada correctamente.', 'success');
            this.loadCategories();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
          },
        });
      }
    });
  }
}
