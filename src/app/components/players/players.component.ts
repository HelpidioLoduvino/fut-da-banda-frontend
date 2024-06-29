import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-players',
  standalone: true,
    imports: [
        FooterComponent,
        NavbarComponent
    ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {

}
