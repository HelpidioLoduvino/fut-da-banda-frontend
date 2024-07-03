import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgOptimizedImage} from "@angular/common";
import {LucideAngularModule} from "lucide-angular";

@Component({
  selector: 'app-transfer-market',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    NgOptimizedImage,
    LucideAngularModule
  ],
  templateUrl: './transfer-market.component.html',
  styleUrl: './transfer-market.component.css'
})
export class TransferMarketComponent {

}
