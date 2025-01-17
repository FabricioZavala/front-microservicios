import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';
import { CategoryGatewayService } from '../../../../../core/services/category-gateway.service';
import { Category } from '../../../../../core/interfaces/category.interface';

@Component({
  selector: 'app-filter-equipment',
  templateUrl: './filter-equipment.component.html',
  styleUrls: ['./filter-equipment.component.scss'],
})
export class FilterEquipmentComponent implements OnInit {
  equipmentFilterForm!: FormGroup;
  categories: Category[] = [];
  isExpanded = false;

  constructor(
    private fb: FormBuilder,
    private filterCommunicationService: FilterCommunicationService,
    private categoryService: CategoryGatewayService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
  }

  // Inicializar formulario
  initializeForm(): void {
    this.equipmentFilterForm = this.fb.group({
      name: [''],
      description: [''],
      status: [''],
      categoryName: [''],
    });
  }

  // Cargar categorías
  loadCategories(): void {
    this.categoryService.getCategories({ page: 1, limit: 100 }).subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });
  }

  sendFilter(): void {
    const fv = this.equipmentFilterForm.value;

    const filters = {
      name: fv.name || '',
      description: fv.description || '',
      status: fv.status || '',
      categoryName: fv.categoryName || '', // Aquí enviamos el nombre de la categoría
    };

    console.log('Filtros aplicados:', filters);
    this.filterCommunicationService.changeFilter(filters);
  }

  resetFilter(): void {
    this.equipmentFilterForm.reset({
      name: '',
      description: '',
      status: '',
      categoryName: '', // Vaciamos la categoría por nombre
    });

    const resetFilters = {
      name: '',
      description: '',
      status: '',
      categoryName: '',
    };

    console.log('Filtros restablecidos:', resetFilters);
    this.filterCommunicationService.changeFilter(resetFilters);
  }

  // Expandir o colapsar el formulario
  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
