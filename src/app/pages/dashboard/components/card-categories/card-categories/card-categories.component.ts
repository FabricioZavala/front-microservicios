import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
} from 'ng-apexcharts';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { CategoryGatewayService } from '../../../../../core/services/category-gateway.service';

@Component({
  selector: 'app-card-categories',
  templateUrl: './card-categories.component.html',
  styleUrls: ['./card-categories.component.scss'],
})
export class CardCategoriesComponent implements OnInit {
  public categoriesToday: number = 0;
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
          data: [],
        },
      ],
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: true,
          tools: {
            download: true,
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

    dayjs.locale('es');
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories({ page: 1, limit: 100 }).subscribe({
      next: (response) => {
        const categories = response.data;

        const groupedByDay: Record<string, number> = {};
        const today = dayjs().format('YYYY-MM-DD');
        this.categoriesToday = 0;

        categories.forEach((cat) => {
          const creationDate = dayjs(cat.createdAt).format('YYYY-MM-DD');

          groupedByDay[creationDate] = (groupedByDay[creationDate] || 0) + 1;

          if (creationDate === today) {
            this.categoriesToday++;
          }
        });

        const days = Object.keys(groupedByDay).sort();

        this.chartOptions.series[0].data = days.map((day) => {
          const timestamp = new Date(day).getTime();
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
