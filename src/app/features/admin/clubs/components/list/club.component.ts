import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ClubService} from "../../../../../core/services/club.service";
import {BarChartComponent} from "../../../dashboard/charts/bar-chart/bar-chart.component";
import {NotificationComponent} from "../../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../../shared/shared.module";
import {NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {Club} from "../../../../../core/models/Club";
import {Page} from "../../../../../core/models/Page";
import {Router} from "@angular/router";
import {EditComponent} from "../edit/edit.component";
import {ClubFormComponent} from "../../../../../shared/components/club-form/club-form.component";
import {SaveComponent} from "../save/save.component";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-admin-club',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    BarChartComponent,
    SharedModule,
    NotificationComponent,
    NgOptimizedImage,
    ClubFormComponent,
  ],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit{
  clubs: any[] = []
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 6;


  constructor(private clubService: ClubService,
              private modal: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar
              ) {
  }

  ngOnInit(): void {
    this.loadClubs()
  }


  loadClubs(): void {
    this.clubService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Club>) => {
        this.clubs = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
      },
      error: (err) => console.error('Erro ao buscar clubes:', err)
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadClubs();
    }
  }

  ban(id: number){
    this.clubService.ban(id).subscribe(response=>{
      if(response.ok){
        this.snackBar.open("Clube bloqueado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }

  unban(id: number){
    this.clubService.unban(id).subscribe(response=>{
      if(response.ok){
        this.snackBar.open("Clube desbloqueado", 'Fechar', {
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

  detail(id: number){
    this.router.navigate(['admin-clube' , id]).then()
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

}
