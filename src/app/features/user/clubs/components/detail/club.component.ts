import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SharedModule
  ],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent {

}
