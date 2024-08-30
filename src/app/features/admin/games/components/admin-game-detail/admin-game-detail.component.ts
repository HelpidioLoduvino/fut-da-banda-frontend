import { Component } from '@angular/core';
import {
  ChampionshipDetailComponent
} from "../../../../../shared/components/championship-detail/championship-detail.component";
import {GameDetailComponent} from "../../../../../shared/components/game-detail/game-detail.component";
import {SharedModule} from "../../../../../shared/shared.module";

@Component({
  selector: 'app-admin-game-detail',
  standalone: true,
  imports: [
    ChampionshipDetailComponent,
    GameDetailComponent,
    SharedModule
  ],
  templateUrl: './admin-game-detail.component.html',
  styleUrl: './admin-game-detail.component.css'
})
export class AdminGameDetailComponent {

}
