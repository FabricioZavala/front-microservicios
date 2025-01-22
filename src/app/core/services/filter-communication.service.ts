import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterCommunicationService {
  private filterSource = new BehaviorSubject<any>(null);
  currentFilter = this.filterSource.asObservable();

  constructor() {}

  changeFilter(filter: any) {
    this.filterSource.next(filter);
  }

  resetFilter() {
    this.filterSource.next(null);
  }
}
