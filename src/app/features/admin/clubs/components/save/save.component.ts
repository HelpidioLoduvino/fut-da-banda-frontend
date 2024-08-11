import { Component } from '@angular/core';
import {ClubFormComponent} from "../../../../../shared/components/club-form/club-form.component";

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [
    ClubFormComponent
  ],
  templateUrl: './save.component.html',
  styleUrl: './save.component.css'
})
export class SaveComponent {

}
