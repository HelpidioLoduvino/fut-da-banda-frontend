import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-transfer-market',
  standalone: true,
    imports: [
        FooterComponent,
        NavbarComponent
    ],
  templateUrl: './transfer-market.component.html',
  styleUrl: './transfer-market.component.css'
})
export class TransferMarketComponent {

}
