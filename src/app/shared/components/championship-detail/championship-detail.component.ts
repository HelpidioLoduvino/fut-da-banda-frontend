import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared.module";
import {Championship} from "../../../core/models/Championship";
import {ChampionshipService} from "../../../core/services/championship.service";
import {ActivatedRoute, Router} from "@angular/router";
import {InvitationService} from "../../../core/services/invitation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClubService} from "../../../core/services/club.service";
import {NgOptimizedImage} from "@angular/common";
import {GameService} from "../../../core/services/game.service";
import {Page} from "../../../core/models/Page";
import {Game} from "../../../core/models/Game";
import {UserService} from "../../../core/services/user.service";
import {GameStat} from "../../../core/models/GameStat";

@Component({
  selector: 'app-championship-detail',
  standalone: true,
  imports: [
    SharedModule,
    NgOptimizedImage
  ],
  templateUrl: './championship-detail.component.html',
  styleUrl: './championship-detail.component.css'
})
export class ChampionshipDetailComponent implements OnInit{

  championship!: Championship
  id!: number
  isLoading = false
  clubAvailable = false
  clubPermission: any[] = []
  stats: any[] = []
  matchDay: number = 1
  imageUrl: { [key: number]: string } = {};
  games: Game[] = []
  firstClubGameStat!: GameStat;
  secondClubGameStat!: GameStat;
  totalElements: number = 0;
  totalPages: number = 0;
  userRole: string | null = ''
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private championshipService: ChampionshipService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private invitationService: InvitationService,
              private clubService: ClubService,
              private gameService: GameService,
              private toast: MatSnackBar
              ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['id']
      if(this.id){
        this.detail(this.id)
        this.isClubAvailable(this.id)
        this.getStats(this.id)
        this.loadGames(this.id)
      }
      this.clubAlreadyAsked()
      this.getUserRole()
    })
  }

  detail(id: number){
    this.championshipService.findById(id).subscribe(response=>{
      if(response.ok){
        this.championship = response.body as Championship
      }
    })
  }

  getUserRole(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.userRole = response.body
      }
    })
  }

  getStats(id: number){
    this.championshipService.getStats(id).subscribe(response=>{
      if(response.ok){
        this.stats = response.body
        this.loadImages()
      }
    })
  }

  loadGames(id: number){
    this.gameService.getAllByMatchDayAndChampionship(this.currentPage, this.pageSize, this.matchDay, id).subscribe({
      next: (page: Page<Game>) => {
        this.games = page.content;
        this.games.forEach(game=> {
          this.getFirstClubStat(game.id!, game.firstClub.id)
          this.getSecondClubStat(game.id!, game.secondClub.id)
        })
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
        this.loadGamesImages()
      },
      error: (err) => console.error('Erro ao buscar Jogos Marcados:', err)
    })
  }

  getFirstClubStat(gameId: number, clubId: number){
    this.gameService.getClubStat(gameId, clubId).subscribe(response=>{
      if(response.ok){
        if (response.ok) {
          this.firstClubGameStat = response.body as GameStat
        }
      }
    })
  }

  getSecondClubStat(gameId: number, clubId: number){
    this.gameService.getClubStat(gameId, clubId).subscribe(response=>{
      if(response.ok){
        if (response.ok) {
          this.secondClubGameStat = response.body as GameStat
        }
      }
    })
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadGames(this.id);
    }
  }

  previousMatchDay() {
    if (this.matchDay > 1) {
      this.matchDay--;
      this.loadGames(this.id);
    }
  }

  nextMatchDay() {
    this.matchDay++;
    this.loadGames(this.id);
  }

  loadImages(): void {
    const clubs = this.stats
    const clubsIds = clubs.map((club: { id: any; }) => club.id);
    clubsIds.forEach((id: number) =>{
      this.displayCover(id);
    })
  }

  loadGamesImages(): void {
    const games = this.games;
    games.forEach((game: any) => {
      const firstClubId = game.firstClub.id;
      const secondClubId = game.secondClub.id;
      this.displayCover(firstClubId);
      this.displayCover(secondClubId);
    });
  }


  isClubAvailable(id: number){
    this.clubService.available(id).subscribe(response=>{
      this.clubAvailable = response
    })
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

  clubAlreadyAsked(){
    this.invitationService.clubAlreadyAskedForPermission().subscribe({
      next: value => {
        this.clubPermission = value
      }, error: err => {
        console.error("Erro ao recuperar dados", err)
      }
    })
  }

  adminGameDetail(id: number){
    this.router.navigate(['/admin-jogo', id])
  }

  gameDetail(id: number){
    this.router.navigate(['/jogo', id])
  }

  askToJoin(id: number){
    this.isLoading = true
    this.invitationService.askToJoinChampionship(id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false
        this.toast.open("Pedido enviado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      } else {
        this.isLoading = false
        this.toast.open("Erro ao enviar Pedido!", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      }
    })
  }


}
