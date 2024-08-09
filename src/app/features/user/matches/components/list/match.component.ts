import { Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {SharedModule} from "../../../../../shared/shared.module";

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    SharedModule
  ],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent {

}
