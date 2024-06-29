import { Component } from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {LucideAngularModule} from "lucide-angular";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgClass} from "@angular/common";
import { IconsModule } from "../../icons/icons.module";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FooterComponent,
    LucideAngularModule,
    RouterLink,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgClass,
    IconsModule,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isSidebarOpened: boolean = false;

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

}
