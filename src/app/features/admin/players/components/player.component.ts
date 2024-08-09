import {Component, OnInit} from '@angular/core';
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgOptimizedImage} from "@angular/common";
import {UserService} from "../../../../core/services/user.service";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-admin-player',
  standalone: true,
  imports: [
    NotificationComponent,
    MatTab,
    MatTabGroup,
    NgOptimizedImage,
    SharedModule
  ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css'
})
export class PlayerComponent implements OnInit{

  players: any[] = [];
  imageUrls: { [key: number]: string } = {};

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getAllPlayers().subscribe(response=>{
      this.players = response
      this.loadImages();
    })
  }

  loadImages(): void {
    const players = this.players
    const playersIds = players.map((player: { id: any; }) => player.id);
    playersIds.forEach((id: number) =>{
      this.showPhoto(id);
    })
  }

  showPhoto(id: number){
    this.userService.showPhoto(id).subscribe(response=>{
      this.imageUrls[id] = window.URL.createObjectURL(response);
    })
  }

}
