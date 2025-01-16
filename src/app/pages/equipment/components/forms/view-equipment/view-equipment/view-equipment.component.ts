import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipment } from '../../../../../../core/interfaces/equipment.interface';

@Component({
  selector: 'app-view-equipment',
  templateUrl: './view-equipment.component.html',
  styleUrls: ['./view-equipment.component.scss'],
})
export class ViewEquipmentComponent {
  @Input() equipment!: Equipment; // Recibe el equipo desde la tabla

  constructor(public activeModal: NgbActiveModal) {}

  closeModal(): void {
    this.activeModal.close();
  }
}
