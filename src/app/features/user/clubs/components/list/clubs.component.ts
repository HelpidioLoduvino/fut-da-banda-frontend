import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {ClubService} from "../../../../../core/services/club.service";
import {SharedModule} from "../../../../../shared/shared.module";
import {Page} from "../../../../../core/models/Page";
import {Club} from "../../../../../core/models/Club";

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SharedModule
  ],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.css'
})
export class ClubsComponent implements OnInit{

  clubs: any[] = [];
  image: any = {};
  imageUrls: { [key: number]: string } = {};
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private router: Router,
              private clubService: ClubService,
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


  loadImages(): void {
    const clubs = this.clubs
    const clubsIds = clubs.map((club: { id: any; }) => club.id);
    clubsIds.forEach((id: number) =>{
      this.displayCover(id);
    })
  }

  clubDetails(){
    this.router.navigate(['/clube']).then();
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
