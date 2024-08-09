import { Component } from '@angular/core';
import {NavbarComponent} from "../../../../shared/components/navbar/navbar.component";
import {FooterComponent} from "../../../../shared/components/footer/footer.component";
import {CarouselComponent} from "../carousel/carousel.component";
import {RouterLink} from "@angular/router";
import {SharedModule} from "../../../../shared/shared.module";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    RouterLink,
    SharedModule,
    LucideAngularModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
