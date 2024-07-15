import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";

@Component({
  selector: 'app-admin-player',
  standalone: true,
    imports: [
      AdminNavbarComponent,
      LucideAngularModule,
      IconsModule
    ],
  templateUrl: './admin-player.component.html',
  styleUrl: './admin-player.component.css'
})
export class AdminPlayerComponent {

}
