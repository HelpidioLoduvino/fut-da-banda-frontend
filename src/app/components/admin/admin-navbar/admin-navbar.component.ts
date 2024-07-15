import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {LucideAngularModule} from "lucide-angular";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  constructor(private userService: UserService) {
  }

  logout(): void {
    this.userService.logout();
  }

}
