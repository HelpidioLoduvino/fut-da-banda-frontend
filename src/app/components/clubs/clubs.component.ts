import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    NgOptimizedImage
  ],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.css'
})
export class ClubsComponent {

  constructor(private router: Router) {
  }

  clubDetails(){
    this.router.navigate(['/clube']);
  }

}
