import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../../../../../shared/components/admin-navbar/admin-navbar.component";
import {AdminSidebarComponent} from "../../../../../shared/components/admin-sidebar/admin-sidebar.component";
import {LucideAngularModule} from "lucide-angular";
import {NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";
import {
  ChampionshipDetailComponent
} from "../../../../../shared/components/championship-detail/championship-detail.component";

@Component({
  selector: 'app-admin-championship',
  standalone: true,
  imports: [
    SharedModule,
    ChampionshipDetailComponent
  ],
  templateUrl: './admin-championship.component.html',
  styleUrl: './admin-championship.component.css'
})
export class AdminChampionshipComponent {

}
