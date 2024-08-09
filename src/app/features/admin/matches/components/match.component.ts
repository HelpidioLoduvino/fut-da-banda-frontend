import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-admin-match',
  standalone: true,
    imports: [
        MatTab,
        MatTabGroup,
        NotificationComponent,
        SharedModule
    ],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent {

}
