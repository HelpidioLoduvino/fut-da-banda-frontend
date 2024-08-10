import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {MatStepperModule} from "@angular/material/stepper";
import {SharedModule} from "../../../shared/shared.module";
import {RegisterFormComponent} from "../register-form/register-form.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    SharedModule,
    MatStepperModule,
    RegisterFormComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

}
