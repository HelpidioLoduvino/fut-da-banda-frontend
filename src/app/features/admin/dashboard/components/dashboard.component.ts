import { Component } from '@angular/core';
import {BarChartComponent} from "../charts/bar-chart/bar-chart.component";
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    BarChartComponent,
    NotificationComponent,
    SharedModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
