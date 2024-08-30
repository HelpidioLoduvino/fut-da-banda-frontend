import { Component } from '@angular/core';
import {NavbarComponent} from "../../../../../../shared/components/navbar/navbar.component";
import {FooterComponent} from "../../../../../../shared/components/footer/footer.component";
import {NgForOf, NgIf} from "@angular/common";
import {GameDetailComponent} from "../../../../../../shared/components/game-detail/game-detail.component";

@Component({
  selector: 'app-user-game-detail',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    NgForOf,
    NgIf,
    GameDetailComponent
  ],
  templateUrl: './user-game-detail.component.html',
  styleUrl: './user-game-detail.component.css'
})
export class UserGameDetailComponent {

}
