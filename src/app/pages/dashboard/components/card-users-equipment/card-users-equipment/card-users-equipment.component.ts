import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
} from 'ng-apexcharts';
import { UserService } from '../../../../../core/services/user-gateway.service';

@Component({
  selector: 'app-card-users-equipment',
  templateUrl: './card-users-equipment.component.html',
  styleUrls: ['./card-users-equipment.component.scss'],
})
export class CardUsersEquipmentComponent implements OnInit {
  public totalUsers: number = 0;

  public chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    tooltip: ApexTooltip;
  };

  constructor(private userService: UserService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [],
        labels: {
          formatter: (value) => value, // Asegurarse de mostrar el texto del usuario
        },
      },
      yaxis: {
        title: {
          text: 'Usuarios',
        },
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val: number) => `${val} equipos`,
        },
      },
    };
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    const params = {
      page: 1, // Asignar valores por defecto
      limit: 10,
    };

    this.userService.getAll(params).subscribe({
      next: (response) => {
        const users = response.data;

        this.totalUsers = response.totalCount;

        // Preparar datos para la gráfica
        const categories = users.map(
          (user) => user.fullName || user.username || 'Usuario'
        );
        const seriesData = users.map((user) => user.equipments?.length || 0);

        // Actualizar opciones de la gráfica
        this.chartOptions.series = [{ name: 'Equipos', data: seriesData }];
        this.chartOptions.xaxis.categories = categories; // Asegurar que se asignen las categorías correctas
      },
      error: (err) => {
        console.error('Error al obtener datos de los usuarios:', err);
      },
    });
  }
}
