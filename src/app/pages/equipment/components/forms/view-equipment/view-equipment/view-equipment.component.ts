import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipment } from '../../../../../../core/interfaces/equipment.interface';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.scss'],
})
export class ViewEquipmentComponent {
  @Input() equipment!: Equipment;

  constructor(public activeModal: NgbActiveModal) {}

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
  closeModal(): void {
    this.activeModal.close();
  }
}
