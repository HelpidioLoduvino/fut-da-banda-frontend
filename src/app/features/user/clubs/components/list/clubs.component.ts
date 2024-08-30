import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {ClubService} from "../../../../../core/services/club.service";
import {SharedModule} from "../../../../../shared/shared.module";
import {Page} from "../../../../../core/models/Page";
import {Club} from "../../../../../core/models/Club";
import {InvitationService} from "../../../../../core/services/invitation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../../../core/services/user.service";
import {User} from "../../../../../core/models/User";

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
  isLoading = false
  playerHasClub = false
  playerPermissions: any[] = []
  user: any = {}

  constructor(private router: Router,
              private clubService: ClubService,
              private userService: UserService,
              private invitationService: InvitationService,
              private toast: MatSnackBar
              ) {
  }

  ngOnInit(): void {
    this.loadClubs()
    this.hasClub()
    this.getPlayerPermissions()
    this.isLogged()
  }

  isLogged(){
    this.userService.getAuthenticated().subscribe(response=>{
      if(response.ok){
        this.user = response.body
      }
    })
  }

  loadClubs(): void {
    this.clubService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Club>) => {
        this.clubs = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
        this.loadImages()
      },
      error: (err) => console.error('Erro ao buscar clubes:', err)
    });
  }

  hasClub(){
    this.clubService.playerHasClub().subscribe(response=>{
      if(response.ok){
        this.playerHasClub = response.body
      }
    })
  }

  getPlayerPermissions(){
    this.invitationService.listPlayerPermission().subscribe(response=>{
      if(response.ok){
        this.playerPermissions = response.body
      }
    })
  }

  playerAlreadyAskedForPermission(clubId: number): boolean{
    return this.playerPermissions.some(permission => permission.club.id === clubId);
  }

  askToJoin(id: number){
    this.isLoading = true;
    this.invitationService.joinClub(id).subscribe(response=>{
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
        this.toast.open("Erro ao fazer pedido", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      }
    })

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
