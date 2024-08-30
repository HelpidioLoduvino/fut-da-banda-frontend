import {Component} from '@angular/core';
import {SharedModule} from "../../../../../shared/shared.module";
import {AvailablePayerComponent} from "../../../../../shared/components/available-payer/available-payer.component";

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [
    SharedModule,
    AvailablePayerComponent
  ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent{

}
