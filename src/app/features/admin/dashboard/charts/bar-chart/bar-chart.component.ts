import { Component } from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    CanvasJSAngularChartsModule,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

  chartOptions = {
    title:{
      text: "Gráfico Geral"
    },
    backgroundColor: '#F4F2F3',
    animationEnabled: true,
    data: [{
      type: "column",
      dataPoints: [
        { label: "Users", y: 20 },
        { label: "Clubes", y: 5 },
        { label: "Campos", y: 10 },
        { label: "Campeonatos", y: 3 }
      ]
    }]
  }
}
