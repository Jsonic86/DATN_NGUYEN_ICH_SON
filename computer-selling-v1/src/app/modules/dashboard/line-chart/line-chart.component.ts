import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @ViewChild('lineChart') lineChart!: any;
  @Input() year: number = 2025; // Default year, can be changed as needed
  chartInstance!: Chart;
  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.dashboardService.getCountPayment({ year: 2025 }).subscribe(data => {
      this.initChart(data.result);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['year'].previousValue != changes['year'].currentValue) {
      this.dashboardService.getCountPayment({ year: this.year }).subscribe(data => {
        this.initChart(data.result);
      });
    }
  }
  initChart(chartData: any) {
    let month = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const data = {
      labels: [...month],
      datasets: [
        {
          label: 'Tiền mặt',
          data: chartData.cash,
          borderColor: 'red',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'VNPay',
          data: chartData.vnpay,
          borderColor: 'blue',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }
      ]
    };

    const config: any = {
      type: 'line',
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
            text: 'Biểu đồ so sánh phương thức thanh toán'
          }
        }
      },
    };

    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy previous instance if it exists
    }

    this.chartInstance = new Chart(this.lineChart.nativeElement, config);
  }
}
