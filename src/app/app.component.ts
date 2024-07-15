import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {IconsModule} from "./icons/icons.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fut-da-banda-frontend';
}
