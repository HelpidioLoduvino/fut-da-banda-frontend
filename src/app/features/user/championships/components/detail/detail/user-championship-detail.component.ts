import { Component } from '@angular/core';
import {FooterComponent} from "../../../../../../shared/components/footer/footer.component";
import {LucideAngularModule} from "lucide-angular";
import {MatMenu} from "@angular/material/menu";
import {NavbarComponent} from "../../../../../../shared/components/navbar/navbar.component";
import {NgForOf} from "@angular/common";
import {
  ChampionshipDetailComponent
} from "../../../../../../shared/components/championship-detail/championship-detail.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FooterComponent,
    LucideAngularModule,
    MatMenu,
    NavbarComponent,
    NgForOf,
    ChampionshipDetailComponent
  ],
  templateUrl: './user-championship-detail.component.html',
  styleUrl: './user-championship-detail.component.css'
})
export class UserChampionshipDetailComponent {

}
