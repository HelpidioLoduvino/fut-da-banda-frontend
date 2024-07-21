import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {BarChartComponent} from "../bar-chart/bar-chart.component";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";
import {AdminNotificationComponent} from "../admin-notification/admin-notification.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule,
    BarChartComponent,
    AdminSidebarComponent,
    AdminNotificationComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
