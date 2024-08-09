import { Component } from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-admin-notification',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

}
