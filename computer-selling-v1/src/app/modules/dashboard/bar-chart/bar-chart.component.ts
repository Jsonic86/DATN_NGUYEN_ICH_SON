import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit, OnInit {
  @ViewChild('barChart') barChart!: any;

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.dashboardService.getRevenueByMonth({ year: 2025 }).subscribe(data => {
      this.initChart(data.result);
    });
  }
  initChart(chartData: any) {
    let month = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const data = {
      labels: [...month],
      datasets: [
        {
          label: 'Doanh thu',
          data: [...chartData],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    const config: any = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Thống kê doanh thu theo tháng'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    new Chart(this.barChart.nativeElement, config);
  }
}
