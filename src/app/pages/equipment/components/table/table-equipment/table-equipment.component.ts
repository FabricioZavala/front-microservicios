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
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';

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
  filters: { name?: string; description?: string; status?: string; categoryName?: string } = {};

  constructor(
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    private filterService: FilterCommunicationService
  ) {}

  ngOnInit(): void {
    this.loadEquipments();

    this.filterService.currentFilter.subscribe((filter) => {
      if (filter) {
        this.filters = filter;
        this.page = 1;
        this.loadEquipments();
      }
    });
  }

  loadEquipments(): void {
    this.isLoading = true;

    const params = {
      page: this.page,
      limit: this.limit,
      name: this.filters.name || '',
      description: this.filters.description || '',
      status: this.filters.status || '',
      categoryName: this.filters.categoryName || '',
    };

    console.log('Parámetros enviados al backend:', params);

    this.equipmentService.getAll(params).subscribe({
      next: (response) => {
        this.equipments = response.data;
        this.collectionSize = response.totalCount;
        this.isLoading = false;
        console.log('Datos recibidos del backend:', response);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al cargar los equipos:', err);
      },
    });
  }

  reloadTable(): void {
    this.loadEquipments();
  }

  openCreateEditModal(equipment?: Equipment): void {
    const modalRef = this.modalService.open(CreateEditEquipmentComponent, {
      size: 'lg',
    });
    
    if (equipment) {
      modalRef.componentInstance.equipment = equipment;
    }

    modalRef.componentInstance.refreshTable.subscribe(() => {
      this.loadEquipments();
    });

    modalRef.result.catch(() => {});
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

    const tableColumn = ['Nombre', 'Descripción', 'Estado', 'Categoría'];
    const tableRows = this.equipments.map((equipment) => [
      equipment.name,
      equipment.description || 'Sin descripción',
      equipment.status,
      equipment.categoryInfo?.name || 'Sin categoría',
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

  onPageChange(page: number): void {
    this.page = page;
    this.loadEquipments();
  }

  onLimitChange(limit: number): void {
    this.limit = limit;
    this.loadEquipments();
  }
}
