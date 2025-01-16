import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexDataLabels } from 'ng-apexcharts';
import * as dayjs from 'dayjs';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { CategoryGatewayService } from '../../../../../core/services/category-gateway.service';

dayjs.extend((weekOfYear as any));

@Component({
  selector: 'app-card-categories',
  templateUrl: './card-categories.component.html',
  styleUrls: ['./card-categories.component.scss']
})
export class CardCategoriesComponent implements OnInit {
  public categoriesCount: number = 0;
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
          data: []
        }
      ],
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        categories: []
      },
      dataLabels: {
        enabled: true
      }
    };
  }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categoriesCount = categories.length;

        const groupedByWeek: Record<string, number> = {};
        categories.forEach((cat) => {
          const week = dayjs(cat.createdAt).startOf('week').format('YYYY-MM-DD');
          groupedByWeek[week] = (groupedByWeek[week] || 0) + 1;
        });

        const weeks = Object.keys(groupedByWeek).sort();
        this.chartOptions.xaxis.categories = weeks;
        this.chartOptions.series[0].data = weeks.map((week) => groupedByWeek[week]);
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }
}
