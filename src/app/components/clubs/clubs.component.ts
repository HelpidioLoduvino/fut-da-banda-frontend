import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {ClubService} from "../../services/club.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.css'
})
export class ClubsComponent implements OnInit{

  clubs: any[] = [];
  image: any = {};
  imageUrls: { [key: number]: string } = {};

  constructor(private router: Router,
              private clubService: ClubService,
              ) {
  }

  ngOnInit(): void {
    this.clubService.getAll().subscribe(response=>{
      this.clubs = response;
      this.loadImages();
    })
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
