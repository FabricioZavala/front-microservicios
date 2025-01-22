import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterCommunicationService } from '../../../../../core/services/filter-communication.service';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss'],
})
export class FilterUserComponent implements OnInit {
  userFilterForm!: FormGroup;
  isExpanded = false;

  constructor(
    private fb: FormBuilder,
    private filterCommunicationService: FilterCommunicationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.userFilterForm = this.fb.group({
      fullName: [''],
      email: [''],
      status: [''],
      roles: [''],
    });
  }

  sendFilter(): void {
    const formValues = this.userFilterForm.value;
  
    const filters = {
      fullName: formValues.fullName || '',
      email: formValues.email || '',
      status: formValues.status || '',
      roles: formValues.roles || '',
    };
  
    this.filterCommunicationService.changeFilter(filters);
  }

  resetFilter(): void {
    this.userFilterForm.reset({
      fullName: '',
      email: '',
      status: '',
      roles: '',
    });

    const resetFilters = {
      fullName: '',
      email: '',
      status: '',
      roles: '',
    };

    this.filterCommunicationService.changeFilter(resetFilters);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
