import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NotificationComponent} from "../../../../../core/components/notifications/notification.component";
import {BarChartComponent} from "../../../dashboard/charts/bar-chart/bar-chart.component";
import {ChampionshipService} from "../../../../../core/services/championship.service";
import {SharedModule} from "../../../../../shared/shared.module";
import {MatDialog} from "@angular/material/dialog";
import {Page} from "../../../../../core/models/Page";
import {Championship} from "../../../../../core/models/Championship";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {EditComponent} from "../edit/edit.component";
import {SaveComponent} from "../save/save.component";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-admin-championship',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    NotificationComponent,
    BarChartComponent,
    SharedModule
  ],
  templateUrl: './championship.component.html',
  styleUrl: './championship.component.css'
})
export class ChampionshipComponent implements OnInit{

  championships: any[] = []
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;

  constructor(private championshipService: ChampionshipService,
              private modal: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loadChampionships()
  }

  loadChampionships(){
    this.championshipService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Championship>) => {
        this.championships = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
      },
      error: (err) => console.error('Erro ao buscar clubes:', err)
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadChampionships();
    }
  }

  save(): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        component: SaveComponent,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ban(id: number){
    this.championshipService.ban(id).subscribe(response=>{
      if(response.ok){
        this.snackBar.open("Campeonato bloqueado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }

  unban(id: number){
    this.championshipService.unban(id).subscribe(response=>{
      if(response.ok){
        this.snackBar.open("Campeonato desbloqueado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }

  edit(id: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        component: EditComponent,
        componentData: { id: id}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
