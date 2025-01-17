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
  
    // Configuración de la tabla
    (doc as any).autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Espaciado inicial
      styles: {
        fontSize: 10,
        halign: 'center', // Alinear el contenido al centro
        lineColor: [200, 200, 200], // Bordes suaves
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [50, 50, 50], // Color de fondo de la cabecera
        textColor: [255, 255, 255], // Color del texto en la cabecera
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Color alternativo para las filas
      },
      bodyStyles: {
        textColor: [50, 50, 50], // Color del texto de las filas
      },
      margin: { top: 20 },
    });
  
    // Pie de página
    const pageCount = doc.internal.pages.length - 1; // Calcular número de páginas
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
  
    // Guardar el archivo PDF
    doc.save('Reporte_Categorias.pdf');
  }
  
  
}
