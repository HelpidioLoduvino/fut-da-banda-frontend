import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    NgOptimizedImage
  ],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent {

}
