import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";
import {ClubDetailComponent} from "../../../../../shared/components/club-detail/club-detail.component";

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SharedModule,
    ClubDetailComponent
  ],
  templateUrl: './user-club-detail.component.html',
  styleUrl: './user-club-detail.component.css'
})
export class UserClubDetailComponent implements OnInit{
  ngOnInit(): void {
  }

}
