import { Component } from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
