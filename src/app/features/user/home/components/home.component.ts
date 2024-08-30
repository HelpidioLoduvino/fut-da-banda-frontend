import {Component, OnInit} from '@angular/core';
import {CarouselComponent} from "../carousel/carousel.component";
import {Router, RouterLink} from "@angular/router";
import {SharedModule} from "../../../../shared/shared.module";
import {NgOptimizedImage} from "@angular/common";
import {GameStat} from "../../../../core/models/GameStat";
import {Championship} from "../../../../core/models/Championship";
import {ChampionshipService} from "../../../../core/services/championship.service";
import {GameService} from "../../../../core/services/game.service";
import {Game} from "../../../../core/models/Game";
import {Club} from "../../../../core/models/Club";
import {ClubService} from "../../../../core/services/club.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselComponent,
    RouterLink,
    SharedModule,
    NgOptimizedImage,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  championships: Championship[] = []
  games: { [key: number]: Game[] } = {};
  firstClubGameStat: { [key: number]: GameStat[] } = {};
  secondClubGameStat: { [key: number]: GameStat[] } = {};
  imageUrls: { [key: number]: string } = {};
  clubs: Club[] = []

  constructor(private championshipService: ChampionshipService,
              private gameService: GameService,
              private router: Router,
              private clubService: ClubService
              ) {
  }

  ngOnInit(): void {
    this.getChampionships()
    this.getClubs()
  }

  getChampionships(){
    this.championshipService.findTwo().subscribe(response=>{
      if(response.ok){
        this.championships = response.body as Championship[]
        this.championships.forEach(championship => {
          this.getGames(championship.id);
        });
      }
    })
  }

  getGames(id: number){
    this.gameService.findFourByChampionshipId(id).subscribe(response=>{
      if(response.ok){
        this.games[id] = response.body as Game[]
        this.games[id].forEach(game => {
          this.getFirstClubStat(game.id!, game.firstClub.id)
          this.getSecondClubStat(game.id!, game.secondClub.id)
        });
      }
    })
  }

  getFirstClubStat(gameId: number, clubId: number){
    this.gameService.getClubStat(gameId, clubId).subscribe(response=>{
      if(response.ok){
        if (response.ok) {
          if (!this.firstClubGameStat[gameId]) {
            this.firstClubGameStat[gameId] = []
          }
          this.firstClubGameStat[gameId].push(response.body as GameStat)
          console.log(this.firstClubGameStat)
        }
      }
    })
  }

  getSecondClubStat(gameId: number, clubId: number){
    this.gameService.getClubStat(gameId, clubId).subscribe(response=>{
      if(response.ok){
        if (response.ok) {
          if (!this.secondClubGameStat[gameId]) {
            this.secondClubGameStat[gameId] = [];
          }
          this.secondClubGameStat[gameId].push(response.body as GameStat);
        }
      }
    })
  }

  getClubs(){
    this.clubService.getThree().subscribe(response=>{
      if(response.ok){
        this.clubs = response.body as Club[]
        this.loadImages()
      }
    })
  }

  loadImages(): void {
    const clubs = this.clubs
    const clubsIds = clubs.map((club: { id: number; }) => club.id);
    clubsIds.forEach((id: number) =>{
      this.displayCover(id);
    })
  }

  championshipDetails(id: number){
    this.router.navigate(['/campeonato', id])
  }

  gameDetails(id: number){
    this.router.navigate(['/jogo', id])
  }

  clubDetails(id: number){
    this.router.navigate(['/clube', id]).then();
  }

  displayCover(id: number): void {
    this.clubService.displayCover(id).subscribe({
      next: (response) => {
        this.imageUrls[id] = window.URL.createObjectURL(response);
      },
      error: (error) => {
        console.error('Error loading image', error);
      }
    });
  }


}
