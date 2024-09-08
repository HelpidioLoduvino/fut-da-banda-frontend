import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/models/User";
import {UserService} from "../../../core/services/user.service";
import {NgOptimizedImage} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";
import {Player} from "../../../core/models/Player";
import {ClubService} from "../../../core/services/club.service";
import {Club} from "../../../core/models/Club";
import {ModalComponent} from "../../../shared/components/modal/modal.component";
import {MatDialog} from "@angular/material/dialog";
import {EditClubComponent} from "../../../shared/components/edit/edit-club.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SharedModule,
    NgOptimizedImage
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  player!: Player
  user!: User
  club!: Club
  imageUrl: { [key: number]: string } = {};

  constructor(private userService: UserService,
              private clubService: ClubService,
              private modal: MatDialog
              ) {
  }

  ngOnInit(): void {
    this.findAuthenticatedUser()
    this.getPlayer()
    this.getClub()
  }

  findAuthenticatedUser(){
    this.userService.getAuthenticated().subscribe(response=>{
      if(response.ok){
        this.user = response.body as User
      }
    })
  }

  getPlayer(){
    this.userService.getPlayer().subscribe({
      next: (response =>{
        this.player = response as Player
        this.userPhoto(this.player.id!)
      })
    })
  }

  getClub(){
    this.clubService.getPlayerClub().subscribe({
      next: (response =>{
        this.club = response as Club
      })
    })
  }

  userPhoto(id: number){
    this.userService.showPhoto(id).subscribe({
      next: (response =>{
        this.imageUrl[id] = window.URL.createObjectURL(response);
      }), error: (error) => {
        console.error('Error loading image', error);
      }
    })
  }

  edit(id: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        component: EditProfileComponent,
        componentData: { id: id}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
