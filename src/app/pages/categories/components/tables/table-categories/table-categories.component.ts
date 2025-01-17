import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Category } from '../../../../../core/interfaces/category.interface';
import { CategoryGatewayService } from '../../../../../core/services/category-gateway.service';
import { CreateEditCategoriesComponent } from '../../forms/create-edit-categories/create-edit-categories/create-edit-categories.component';
import { ViewCategoriesComponent } from '../../forms/view-categories/view-categories/view-categories.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';

@Component({
  selector: 'app-table-categories',
  templateUrl: './table-categories.component.html',
  styleUrls: ['./table-categories.component.scss'],
})
export class TableCategoriesComponent implements OnInit {
  categories: Category[] = [];
  isLoading: boolean = false;
  page: number = 1;
  limit: number = 10;
  collectionSize: number = 0;
  filters: { name?: string; description?: string; status?: string } = {};

  constructor(
    private categoryService: CategoryGatewayService,
    private modalService: NgbModal,
    private filterService: FilterCommunicationService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.subscribeToFilters();
  }

  subscribeToFilters(): void {
    this.filterService.currentFilter.subscribe((filters) => {
      if (filters) {
        console.log('Filtros recibidos desde el servicio:', filters);
        this.filters = filters;
        this.page = 1;
        this.loadCategories();
      }
    });
  }

  loadCategories(): void {
    this.isLoading = true;

    const params = {
      page: this.page,
      limit: this.limit,
      ...this.filters, // Filtros dinámicos
    };

    console.log('Parámetros enviados al servicio:', params);

    this.categoryService.getCategories(params).subscribe({
      next: (data: any) => {
        console.log('Datos recibidos del servicio:', data);
        this.categories = data.data;
        this.collectionSize = data.totalCount;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
        Swal.fire('Error', 'Error al cargar las categorías.', 'error');
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
            Swal.fire(
              'Eliminado',
              'Categoría eliminada correctamente.',
              'success'
            );
            this.loadCategories();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
          },
        });
      }
    });
  }

  downloadAsExcel(): void {
    const dataToExport = this.categories.map((cat) => ({
      Nombre: cat.name,
      Descripción: cat.description || 'Sin descripción',
      Estado: cat.status === 'active' ? 'Activo' : 'Inactivo',
      'Fecha de Creación': new Date(cat.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Categorías');

    XLSX.writeFile(workbook, 'Categorias.xlsx');
  }

  downloadAsPDF(): void {
    const doc = new jsPDF();

    // Título del PDF
    const title = 'Reporte de Categorías';
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
    const tableColumn = ['Nombre', 'Descripción', 'Estado', 'Fecha de Creación'];
    const tableRows = this.categories.map((cat) => [
      cat.name,
      cat.description || 'Sin descripción',
      cat.status === 'active' ? 'Activo' : 'Inactivo',
      new Date(cat.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    ]);

    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 10,
        halign: 'center',
        lineColor: [200, 200, 200],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [50, 50, 50],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      bodyStyles: {
        textColor: [50, 50, 50],
      },
      margin: { top: 20 },
    });

    const pageCount = doc.internal.pages.length - 1;
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

    doc.save('Reporte_Categorias.pdf');
  }

  onPageChange(page: number): void {
    this.page = page;
    this.loadCategories();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.page = 1;
    this.loadCategories();
  }

  // applyFilters(): void {
  //   this.page = 1;
  //   if (Object.values(this.filters).some((val) => val)) {
  //     this.loadCategories();
  //   }
  // }
}
