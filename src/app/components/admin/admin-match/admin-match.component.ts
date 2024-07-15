import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-admin-match',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule,
    MatTab,
    MatTabGroup
  ],
  templateUrl: './admin-match.component.html',
  styleUrl: './admin-match.component.css'
})
export class AdminMatchComponent {

}
