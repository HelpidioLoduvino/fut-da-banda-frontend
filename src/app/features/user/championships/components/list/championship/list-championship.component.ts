import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../../../../../shared/shared.module";
import {ChampionshipService} from "../../../../../../core/services/championship.service";
import {Championship} from "../../../../../../core/models/Championship";
import {Page} from "../../../../../../core/models/Page";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {Router} from "@angular/router";

@Component({
  selector: 'app-championship',
  standalone: true,
  imports: [
    SharedModule,
    MatMenu,
    MatMenuTrigger
  ],
  templateUrl: './list-championship.component.html',
  styleUrl: './list-championship.component.css'
})
export class ListChampionshipComponent implements OnInit{

  championships: any[] = []
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;

  constructor(private championshipService: ChampionshipService,
              private router: Router
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

  detail(id: number){
    this.router.navigate(['/campeonato', id])
  }


}
