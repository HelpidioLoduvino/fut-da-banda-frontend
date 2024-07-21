import {Component, OnInit} from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {AdminNotificationComponent} from "../admin-notification/admin-notification.component";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-admin-player',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule,
    AdminNotificationComponent,
    AdminSidebarComponent,
    MatTab,
    MatTabGroup,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './admin-player.component.html',
  styleUrl: './admin-player.component.css'
})
export class AdminPlayerComponent implements OnInit{

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
