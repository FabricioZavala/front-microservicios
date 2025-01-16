import { Component, OnInit } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from 'ng-apexcharts';
import { UserService } from '../../../../../core/services/user-gateway.service';

@Component({
  selector: 'app-card-users',
  templateUrl: './card-users.component.html',
  styleUrls: ['./card-users.component.scss'],
})
export class CardUsersComponent implements OnInit {
  public totalUsers: number = 0;
  public activeUsers: number = 0;
  public inactiveUsers: number = 0;

  public chartOptions: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
  };

  constructor(private userService: UserService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Activos', 'Inactivos'],
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
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.totalUsers = users.length;

        this.activeUsers = users.filter(
          (u) => u.status.toLowerCase() === 'active'
        ).length;
        this.inactiveUsers = users.filter(
          (u) => u.status.toLowerCase() === 'inactive'
        ).length;

        this.chartOptions.series = [this.activeUsers, this.inactiveUsers];
      },
      error: (err) => {
        console.error('Error al obtener datos de los usuarios:', err);
      },
    });
  }
}
