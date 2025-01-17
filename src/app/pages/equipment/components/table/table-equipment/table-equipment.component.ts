import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Equipment } from '../../../../../core/interfaces/equipment.interface';
import { EquipmentService } from '../../../../../core/services/equipment.service';
import { CreateEditEquipmentComponent } from '../../forms/create-edit-equipment/create-edit-equipment/create-edit-equipment.component';
import { ViewEquipmentComponent } from '../../forms/view-equipment/view-equipment/view-equipment.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-table-equipment',
  templateUrl: './table-equipment.component.html',
  styleUrls: ['./table-equipment.component.scss'],
})
export class TableEquipmentComponent implements OnInit {
  equipments: Equipment[] = [];
  isLoading = false;
  collectionSize = 0;
  page = 1;
  limit = 10;

  constructor(
    private equipmentService: EquipmentService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadEquipments();
  }

  // Cargar equipos
  loadEquipments(): void {
    this.isLoading = true;
    this.equipmentService.getAll().subscribe({
      next: (data) => {
        this.equipments = data;
        this.collectionSize = data.length; // Ajustar si hay paginación
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al cargar los equipos:', err);
      },
    });
  }

  // Recargar tabla
  reloadTable(): void {
    this.loadEquipments();
  }

  // Abrir modal de creación/edición
  openCreateEditModal(equipment?: Equipment): void {
    const modalRef = this.modalService.open(CreateEditEquipmentComponent, {
      size: 'lg',
    });
    
    if (equipment) {
      modalRef.componentInstance.equipment = equipment;
    }
  
    modalRef.componentInstance.refreshTable.subscribe(() => {
      this.loadEquipments(); // Recargar la tabla cuando se emita el evento
    });
  
    modalRef.result.catch(() => {}); // Opcional: manejar cierres del modal sin acción
  }
  

  openViewModal(equipment: Equipment): void {
    const modalRef = this.modalService.open(ViewEquipmentComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.equipment = equipment;
  }

  deleteEquipment(equipmentId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el equipo permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.equipmentService.delete(equipmentId).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El equipo ha sido eliminado.', 'success');
            this.loadEquipments();
          },
          error: (err) => {
            Swal.fire('Error', 'No se pudo eliminar el equipo.', 'error');
            console.error('Error al eliminar el equipo:', err);
          },
        });
      }
    });
  }

  downloadAsPDF(): void {
    const doc = new jsPDF();
  
    // Título del PDF
    const title = 'Reporte de Equipos';
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
    const tableColumn = ['Nombre', 'Descripción', 'Estado', 'Categoría'];
    const tableRows = this.equipments.map((equipment) => [
      equipment.name,
      equipment.description || 'Sin descripción',
      equipment.status,
      equipment.categoryInfo?.name || 'Sin categoría',
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
    doc.save('Reporte_Equipos.pdf');
  }
  
  downloadAsExcel(): void {
    const dataToExport = this.equipments.map((equipment) => ({
      Nombre: equipment.name,
      Descripción: equipment.description || 'Sin descripción',
      Estado: equipment.status,
      Categoría: equipment.categoryInfo?.name || 'Sin categoría',
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipos');
  
    XLSX.writeFile(workbook, 'Reporte_Equipos.xlsx');
  }

  // Cambiar página
  onPageChange(page: number): void {
    this.page = page;
    this.loadEquipments();
  }

  // Cambiar límite
  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadEquipments();
  }
}
