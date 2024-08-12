import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ClubService} from "../../../../../core/services/club.service";
import {Club} from "../../../../../core/models/Club";
import {FormsModule} from "@angular/forms";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgOptimizedImage} from "@angular/common";
import {NotificationComponent} from "../../../../../core/components/notifications/notification.component";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {SharedModule} from "../../../../../shared/shared.module";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {ClubDetailComponent} from "../../../../../shared/components/club-detail/club-detail.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FormsModule,
    MatTab,
    MatTabGroup,
    NgOptimizedImage,
    SharedModule,
    NotificationComponent,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterLink,
    ClubDetailComponent
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{

  private id!: number
  public club!: Club;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      if(this.id){
        this.detail(this.id)
      }
    })
  }

  detail(id: number){
    this.clubService.findById(id).subscribe(response=>{
      if(response.ok){
        this.club = response.body as Club
      }
    })
  }

}
