import { Component } from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {NgClass} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    LucideAngularModule,
    IconsModule,
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {

  isSidebarOpened: boolean = false;

  constructor(private userService: UserService) {
  }

  logout(): void {
    this.userService.logout();
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

}
