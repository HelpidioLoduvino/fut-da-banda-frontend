import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NotificationComponent} from "../../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../../shared/shared.module";
import {Page} from "../../../../../core/models/Page";
import {UserService} from "../../../../../core/services/user.service";
import {Player} from "../../../../../core/models/Player";

@Component({
  selector: 'app-players',
  standalone: true,
    imports: [
        MatTab,
        MatTabGroup,
        NotificationComponent,
        SharedModule
    ],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent implements OnInit{

  players: any[] = []
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 2;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  findPlayers(){
    this.userService.getAllPlayers(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Player>) => {
        this.players = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
      },
      error: (err) => console.error('Error finding players:', err)
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.findPlayers();
    }
  }

}
