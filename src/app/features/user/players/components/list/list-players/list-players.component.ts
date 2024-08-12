import { Component } from '@angular/core';
import {FooterComponent} from "../../../../../../shared/components/footer/footer.component";
import {NavbarComponent} from "../../../../../../shared/components/navbar/navbar.component";

@Component({
  selector: 'app-list-players',
  standalone: true,
    imports: [
        FooterComponent,
        NavbarComponent
    ],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.css'
})
export class ListPlayersComponent {

}
