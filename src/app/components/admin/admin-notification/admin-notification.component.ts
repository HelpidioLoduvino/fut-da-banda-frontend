import { Component } from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";

@Component({
  selector: 'app-admin-notification',
  standalone: true,
  imports: [
    LucideAngularModule,
    IconsModule
  ],
  templateUrl: './admin-notification.component.html',
  styleUrl: './admin-notification.component.css'
})
export class AdminNotificationComponent {

}
