import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
} from 'ng-apexcharts';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importar el idioma español
import { CategoryGatewayService } from '../../../../../core/services/category-gateway.service';

@Component({
  selector: 'app-card-categories',
  templateUrl: './card-categories.component.html',
  styleUrls: ['./card-categories.component.scss'],
})
export class CardCategoriesComponent implements OnInit {
  public categoriesToday: number = 0; // Total de categorías creadas hoy
  public chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
  };

  constructor(private categoryService: CategoryGatewayService) {
    this.chartOptions = {
      series: [
        {
          name: 'Categorías creadas',
          data: [], // Se llenará dinámicamente
        },
      ],
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true, // Solo habilitar descarga
            selection: false,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false,
          },
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          formatter: (value: string) =>
            dayjs(value).locale('es').format('D MMM YYYY'),
        },
      },
      dataLabels: {
        enabled: true,
      },
    };

    // Configurar el idioma global para dayjs
    dayjs.locale('es');
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories({ page: 1, limit: 100 }).subscribe({
      next: (response) => {
        const categories = response.data;
        console.log('Categorías obtenidas:', categories);

        const groupedByDay: Record<string, number> = {};
        const today = dayjs().format('YYYY-MM-DD');
        this.categoriesToday = 0;

        categories.forEach((cat) => {
          const creationDate = dayjs(cat.createdAt).format('YYYY-MM-DD');
          console.log(`Fecha para categoría (${cat.name}):`, creationDate);

          // Contar categorías por día
          groupedByDay[creationDate] = (groupedByDay[creationDate] || 0) + 1;

          // Contar las creadas hoy
          if (creationDate === today) {
            this.categoriesToday++;
          }
        });

        console.log('Agrupación por día:', groupedByDay);

        const days = Object.keys(groupedByDay).sort();
        console.log('Días ordenados:', days);

        this.chartOptions.series[0].data = days.map((day) => {
          const timestamp = new Date(day).getTime();
          console.log(`Timestamp para ${day}:`, timestamp);
          return {
            x: timestamp,
            y: groupedByDay[day],
          };
        });
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      },
    });
  }
}
