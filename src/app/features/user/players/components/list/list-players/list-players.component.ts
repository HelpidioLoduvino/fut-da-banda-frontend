import { Component } from '@angular/core';
import {FooterComponent} from "../../../../../../shared/components/footer/footer.component";
import {NavbarComponent} from "../../../../../../shared/components/navbar/navbar.component";
import {AvailablePayerComponent} from "../../../../../../shared/components/available-payer/available-payer.component";

@Component({
  selector: 'app-list-players',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    AvailablePayerComponent
  ],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.css'
})
export class ListPlayersComponent {

}
