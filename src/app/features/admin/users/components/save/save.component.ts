import { Component } from '@angular/core';
import {RegisterFormComponent} from "../../../../../core/auth/register-form/register-form.component";

@Component({
  selector: 'app-save',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './save.component.html',
  styleUrl: './save.component.css'
})
export class SaveComponent {

}
