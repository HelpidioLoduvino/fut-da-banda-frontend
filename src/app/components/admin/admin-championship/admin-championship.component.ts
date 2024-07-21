import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AdminNotificationComponent} from "../admin-notification/admin-notification.component";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";
import {BarChartComponent} from "../bar-chart/bar-chart.component";

@Component({
  selector: 'app-admin-championship',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule,
    MatTab,
    MatTabGroup,
    AdminNotificationComponent,
    AdminSidebarComponent,
    BarChartComponent
  ],
  templateUrl: './admin-championship.component.html',
  styleUrl: './admin-championship.component.css'
})
export class AdminChampionshipComponent {

}
