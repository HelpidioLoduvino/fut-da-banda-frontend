import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NotificationComponent} from "../../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../../shared/shared.module";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {AvailablePayerComponent} from "../../../../../shared/components/available-payer/available-payer.component";

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    NotificationComponent,
    SharedModule,
    AvailablePayerComponent
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent{

}
