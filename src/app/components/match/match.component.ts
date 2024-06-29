import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent {

}
