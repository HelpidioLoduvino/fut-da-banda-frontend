import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-admin-championship',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule,
    MatTab,
    MatTabGroup
  ],
  templateUrl: './admin-championship.component.html',
  styleUrl: './admin-championship.component.css'
})
export class AdminChampionshipComponent {

}
