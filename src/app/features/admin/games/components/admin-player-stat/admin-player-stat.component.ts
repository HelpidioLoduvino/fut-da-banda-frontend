import {Component, Inject, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {GameStat} from "../../../../../core/models/GameStat";
import {GameService} from "../../../../../core/services/game.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-player-stat',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './admin-player-stat.component.html',
  styleUrl: './admin-player-stat.component.css'
})
export class AdminPlayerStatComponent{

  gameId!: number
  playerId!: number
  statistic = ''
  isLoading = false

  constructor(private gameService: GameService,
              private toast: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.gameId = data.componentData.gameId
    this.playerId = data.componentData.playerId
  }

  onStatisticChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.statistic = selectElement.value;
  }

  removeStat(){
    this.isLoading = true
    this.gameService.removePlayerStat(this.gameId, this.playerId, this.statistic).subscribe(response=>{
      if(response.ok){
        this.isLoading = false
        this.toast.open("Estatística removida", 'Fechar', {
          duration: 1000
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        this.isLoading = false
        this.toast.open("Erro ao remover Estatística", 'Fechar', {
          duration: 1000
        });
      }
    })
  }

}
