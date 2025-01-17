import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.scss'],
})
export class FilterCategoriesComponent implements OnInit {
  filterForm: FormGroup;
  isExpanded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private filterService: FilterCommunicationService
  ) {
    this.filterForm = this.fb.group({
      name: [''],
      description: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  resetForm(): void {
    this.filterForm.reset(); // Restablecer el formulario
    const emptyFilters = {}; // Filtros vacíos
  
    this.filterService.changeFilter(emptyFilters); // Enviar filtros vacíos
  
    this.filterService.changeFilter(emptyFilters); // Enviar filtros vacíos
  }
  
  

  sendFilter(): void {
    const filters = this.filterForm.value;
  
    // Reemplazar valores nulos por cadenas vacías
    const cleanedFilters = Object.keys(filters).reduce((acc: Record<string, string>, key: string) => {
      acc[key] = filters[key] === null ? '' : filters[key];
      return acc;
    }, {});
  
    console.log('Filtros aplicados:', cleanedFilters);
    this.filterService.changeFilter(cleanedFilters); // Enviar filtros limpios
  }
  
  
}
