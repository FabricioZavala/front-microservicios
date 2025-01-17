import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { EquipmentService } from '../../../../../core/services/equipment.service';

@Component({
  selector: 'app-card-equipment',
  templateUrl: './card-equipment.component.html',
  styleUrls: ['./card-equipment.component.scss'],
})
export class CardEquipmentComponent implements OnInit {
  public totalEquipment: number = 0;
  public availableEquipment: number = 0;
  public inUseEquipment: number = 0;
  public maintenanceEquipment: number = 0;
  public damagedEquipment: number = 0;

  public chartOptions: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
  };

  constructor(private equipmentService: EquipmentService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Disponible', 'En uso', 'En mantenimiento', 'Dañado'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  ngOnInit(): void {
    this.fetchEquipmentData();
  }

  fetchEquipmentData(): void {
    this.equipmentService.getAll().subscribe({
      next: (response) => {
        const equipments = response.data; // Acceder a los equipos desde `data`
  
        this.totalEquipment = response.totalCount; // Usar `totalCount` para el total
  
        this.availableEquipment = equipments.filter(
          (e) => e.status.toLowerCase() === 'disponible'
        ).length;
  
        this.inUseEquipment = equipments.filter(
          (e) => e.status.toLowerCase() === 'en uso'
        ).length;
  
        this.maintenanceEquipment = equipments.filter(
          (e) => e.status.toLowerCase() === 'en mantenimiento'
        ).length;
  
        this.damagedEquipment = equipments.filter(
          (e) => e.status.toLowerCase() === 'dañado'
        ).length;
  
        this.chartOptions.series = [
          this.availableEquipment,
          this.inUseEquipment,
          this.maintenanceEquipment,
          this.damagedEquipment,
        ];
      },
      error: (err) => {
        console.error('Error al obtener datos de los equipos:', err);
      },
    });
  }
  
}
