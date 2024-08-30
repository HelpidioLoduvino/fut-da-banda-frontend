import {Component, Inject, OnInit} from '@angular/core';
import {GameStat} from "../../../../../core/models/GameStat";
import {GameService} from "../../../../../core/services/game.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SharedModule} from "../../../../../shared/shared.module";
import {finalize, forkJoin} from "rxjs";

@Component({
  selector: 'app-admin-game-stat',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './admin-game-stat.component.html',
  styleUrl: './admin-game-stat.component.css'
})
export class AdminGameStatComponent implements OnInit{

  clubStat!: GameStat
  gameId!: number
  clubId!: number
  playerId!: number
  statistic = ''
  isLoading = false

  constructor(private gameService: GameService,
              private toast: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) {
    this.gameId = data.componentData.gameId
    this.clubId = data.componentData.clubId
  }

  ngOnInit(): void {
    this.getClubStat()
  }

  getClubStat(){
    this.gameService.getClubStat(this.gameId, this.clubId).subscribe(response=>{
      if(response.ok){
        this.clubStat = response.body as GameStat
      }
    })
  }

  onStatisticChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.statistic = selectElement.value;
  }

  onPlayerChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.playerId = Number(selectElement.value);
  }

  addStat() {
    this.isLoading = true;
    let updateCalls$ = [];
    if (this.statistic === 'corner') {
      updateCalls$ = [this.gameService.addClubStat(this.gameId, this.clubId, this.statistic)];
    } else if (this.statistic === 'assist') {
      updateCalls$ = [this.gameService.addPlayerStat(this.gameId, this.playerId, this.statistic)];
    } else {
      updateCalls$ = [
        this.gameService.addClubStat(this.gameId, this.clubId, this.statistic),
        this.gameService.addPlayerStat(this.gameId, this.playerId, this.statistic)
      ];
    }
    forkJoin(updateCalls$)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (responses) => {
          const allOk = responses.every(response => response.ok);
          if (allOk) {
            this.toast.open("Estatística adicionada", 'Fechar', {
              duration: 1000
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            this.toast.open("Erro ao adicionar estatística", 'Fechar', {
              duration: 1000
            });
          }
        },
        error: () => {
          this.isLoading = false;
          this.toast.open("Erro ao adicionar estatística", 'Fechar', {
            duration: 1000
          });
        }
      });
  }


}
