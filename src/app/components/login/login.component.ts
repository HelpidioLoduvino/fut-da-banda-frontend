import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../icons/icons.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule,
    IconsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
