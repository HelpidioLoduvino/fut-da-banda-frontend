import {Component, OnInit} from '@angular/core';
import {Club} from "../../../core/models/Club";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ClubService} from "../../../core/services/club.service";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {SharedModule} from "../../shared.module";
import {EditClubComponent} from "../edit/edit-club.component";
import {ChangeEmblemComponent} from "../change-emblem/change-emblem.component";
import {UserService} from "../../../core/services/user.service";


@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink
  ],
  templateUrl: './club-detail.component.html',
  styleUrl: './club-detail.component.css'
})
export class ClubDetailComponent implements OnInit{

  private id!: number
  public club!: Club;
  role!: string | null
  isCaptain: boolean = false
  imageUrl: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private userService: UserService,
    private modal: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      if(this.id){
        this.detail(this.id)
        this.displayCover(this.id)
        this.isPlayerCaptain(this.id)
      }
    })
    this.findRole()
  }

  findRole(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.role = response.body
      }
    })
  }

  isPlayerCaptain(id: number){
    this.clubService.isPlayerCaptain(id).subscribe(response=>{
      if(response.ok){
        this.isCaptain = response.body
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

  changeEmblem(id: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '400px',
      data: {
        component: ChangeEmblemComponent,
        componentData: { id: id}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  displayCover(id: number): void {
    this.clubService.displayCover(id).subscribe({
      next: (response) => {
        this.imageUrl[id] = window.URL.createObjectURL(response);
      },
      error: (error) => {
        console.error('Error loading cover', error);
      }
    });
  }

  edit(id: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        component: EditClubComponent,
        componentData: { id: id}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
