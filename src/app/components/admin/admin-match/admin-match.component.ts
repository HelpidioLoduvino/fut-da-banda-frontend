import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AdminNotificationComponent} from "../admin-notification/admin-notification.component";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-admin-match',
  standalone: true,
    imports: [
        AdminNavbarComponent,
        LucideAngularModule,
        IconsModule,
        MatTab,
        MatTabGroup,
        AdminNotificationComponent,
        AdminSidebarComponent
    ],
  templateUrl: './admin-match.component.html',
  styleUrl: './admin-match.component.css'
})
export class AdminMatchComponent {

}
