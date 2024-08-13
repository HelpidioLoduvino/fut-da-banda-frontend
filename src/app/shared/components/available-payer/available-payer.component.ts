import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared.module";
import {UserService} from "../../../core/services/user.service";
import {Page} from "../../../core/models/Page";
import {Player} from "../../../core/models/Player";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-available-payer',
  standalone: true,
  imports: [
    SharedModule,
    MatMenu,
    MatMenuTrigger
  ],
  templateUrl: './available-payer.component.html',
  styleUrl: './available-payer.component.css'
})
export class AvailablePayerComponent implements OnInit{

  players: any[] = []
  imageUrls: { [key: number]: string } = {};
  role!: string | null
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.findPlayers()
    this.findRole()
  }

  findRole(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.role = response.body
      }
    })
  }

  findPlayers(){
    this.userService.getAllPlayers(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Player>) => {
        this.players = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
        this.loadImages()
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

  loadImages(): void {
    const players = this.players
    const playersIds = players.map((player: { id: any; }) => player.id);
    playersIds.forEach((id: number) =>{
      this.showPhoto(id);
    })
  }

  showPhoto(id: number){
    this.userService.showPhoto(id).subscribe({
      next: (response) => {
        this.imageUrls[id] = window.URL.createObjectURL(response);
      },
      error: (error) => {
        console.error('Error loading image', error);
      }
    })
  }


}
