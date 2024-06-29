import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-classification',
  standalone: true,
    imports: [
        FooterComponent,
        NavbarComponent
    ],
  templateUrl: './classification.component.html',
  styleUrl: './classification.component.css'
})
export class ClassificationComponent {

}
