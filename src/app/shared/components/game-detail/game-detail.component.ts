import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {
  AdminGameStatComponent
} from "../../../features/admin/games/components/admin-game-stat/admin-game-stat.component";
import {GameService} from "../../../core/services/game.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Game} from "../../../core/models/Game";
import {SharedModule} from "../../shared.module";
import {UserService} from "../../../core/services/user.service";
import {GameStat} from "../../../core/models/GameStat";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {PlayerStat} from "../../../core/models/PlayerStat";
import {
  AdminPlayerStatComponent
} from "../../../features/admin/games/components/admin-player-stat/admin-player-stat.component";
import {ClubService} from "../../../core/services/club.service";

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [
    SharedModule,
    NgOptimizedImage,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterLink,
    NgbCollapseModule
  ],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit{

  gameId!: number
  game!: Game
  role: string | null = ''
  isLoading = false
  gameStat: GameStat[] = []
  playerStat: PlayerStat[] = []
  firstClub!: GameStat
  secondClub!: GameStat
  firstClubId!: number
  secondClubId!: number
  imageUrl: { [key: number]: string } = {};

  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private modal: MatDialog,
              private gameService: GameService,
              private userService: UserService,
              private clubService: ClubService,
              private toast: MatSnackBar,
              private route: ActivatedRoute
              ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.gameId = params['id']
      if(this.gameId){
        this.getGame(this.gameId)
        this.getGameStat(this.gameId)
        this.getPlayerStat(this.gameId)
      }
    })
    this.getRole()
  }

  getGame(gameId: number) {
    this.gameService.findById(gameId).subscribe(response => {
      if (response.ok) {
        this.game = response.body as Game
        console.log(this.game)
        this.firstClubId = this.game.firstClub.id
        this.secondClubId = this.game.secondClub.id
        this.getFirstClubStat(this.gameId, this.firstClubId)
        this.getSecondClubStat(this.gameId, this.secondClubId)
        this.displayCover(this.firstClubId)
        this.displayCover(this.secondClubId)
      }
    })
  }

  getGameStat(id: number){
    this.gameService.getGameStat(id).subscribe(response=>{
      if(response.ok){
        this.gameStat = response.body
      }
    })
  }

  getPlayerStat(gameId: number){
    this.gameService.getPlayerStat(gameId).subscribe(response=>{
      if(response.ok){
        this.playerStat = response.body as PlayerStat[]
      }
    })
  }

  getFirstClubStat(gameId: number, clubId: number){
    this.gameService.getClubStat(gameId, clubId).subscribe(response=>{
      if(response.ok){
        this.firstClub = response.body as GameStat
      }
    })
  }

  getSecondClubStat(gameId: number, clubId: number){
    this.gameService.getClubStat(gameId, clubId).subscribe(response=>{
      if(response.ok){
        this.secondClub = response.body as GameStat
      }
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


  getRole(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.role = response.body
      }
    })
  }

  startGame(){
    this.isLoading = true
    this.gameService.startGame(this.gameId).subscribe(response=>{
      if(response.ok){
        this.isLoading = false
        this.toast.open("Inicio de Jogo", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        },1000)
      } else {
        this.isLoading = false
        this.toast.open("Erro ao iniciar Jogo", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        },1000)
      }
    })
  }

  stopGame(){
    this.isLoading = true
    this.gameService.stopGame(this.gameId).subscribe(response=>{
      if(response.ok){
        this.isLoading = false
        this.toast.open("Jogo terminado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        },1000)
      } else {
        this.isLoading = false
        this.toast.open("Erro ao terminar Jogo", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        },1000)
      }
    })
  }


  edit(gameId: number, clubId: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        component: AdminGameStatComponent,
        componentData: {gameId: gameId, clubId: clubId}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  removeStat(entityId: number, statistic: string) {
    this.isLoading = true;
    this.gameService.removeClubStat(this.gameId, entityId, statistic)
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.toast.open("Estatística removida", 'Fechar', {
              duration: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.toast.open("Erro ao remover estatística", 'Fechar', {
              duration: 1000
            });
          }
        },
        error: () => {
          this.isLoading = false;
          this.toast.open("Erro ao remover estatística", 'Fechar', {
            duration: 1000
          });
        }
      });
  }

  removePlayerStat(gameId?: number, playerId?: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        component: AdminPlayerStatComponent,
        componentData: {gameId: gameId, playerId: playerId}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
