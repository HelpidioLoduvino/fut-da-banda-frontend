import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseChartDirective } from "ng2-charts";
import { RouterOutlet } from '@angular/router';
import {CanvasJS, CanvasJSAngularChartsModule} from '@canvasjs/angular-charts';
import { StatisticService } from "../../../../../core/services/statistic.service";
import { SharedModule } from "../../../../../shared/shared.module";

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    CanvasJSAngularChartsModule,
    RouterOutlet,
    SharedModule
  ],
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit {

  users: number = 0;
  clubs: number = 0;
  championships: number = 0;
  fields: number = 0;

  chart: any;

  constructor(
    private statisticService: StatisticService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.statisticService.countUsers().subscribe(response => {
      if (response.ok) {
        this.users = response.body;
        this.updateChart();
      }
    });

    this.statisticService.countClubs().subscribe(response => {
      if (response.ok) {
        this.clubs = response.body;
        this.updateChart();
      }
    });

    this.statisticService.countChampionships().subscribe(response => {
      if (response.ok) {
        this.championships = response.body;
        this.updateChart();
      }
    });

    this.statisticService.countFields().subscribe(response => {
      if (response.ok) {
        this.fields = response.body;
        this.updateChart();
      }
    });

    this.initializeChart();
  }

  ngAfterViewInit(): void {
    this.updateChart();
  }

  initializeChart() {
    this.chart = {
      title: {
        text: "Gráfico Geral"
      },
      backgroundColor: '#F4F2F3',
      animationEnabled: true,
      data: [{
        type: "column",
        dataPoints: [
          { label: "Users", y: this.users },
          { label: "Clubes", y: this.clubs },
          { label: "Campos", y: this.fields },
          { label: "Campeonatos", y: this.championships }
        ]
      }]
    };

    if (this.chart) {
      this.renderChart();
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.data[0].dataPoints = [
        { label: "Users", y: this.users },
        { label: "Clubes", y: this.clubs },
        { label: "Campos", y: this.fields },
        { label: "Campeonatos", y: this.championships }
      ];
      this.renderChart();
    }
  }

  renderChart() {
    const chartInstance = new CanvasJS.Chart("chartContainer", this.chart);
    chartInstance.render();
  }
}
