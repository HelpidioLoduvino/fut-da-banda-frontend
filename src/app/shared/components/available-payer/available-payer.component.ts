import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared.module";
import {UserService} from "../../../core/services/user.service";
import {Page} from "../../../core/models/Page";
import {Player} from "../../../core/models/Player";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {InvitationService} from "../../../core/services/invitation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Club} from "../../../core/models/Club";
import {ClubService} from "../../../core/services/club.service";

@Component({
  selector: 'app-available-payer',
  standalone: true,
  imports: [
    SharedModule,
    MatMenu,
    MatMenuTrigger
  ],
  templateUrl: './available-payer.component.html',
  styleUrl: './available-payer.component.css'
})
export class AvailablePayerComponent implements OnInit{

  players: any[] = []
  imageUrls: { [key: number]: string } = {};
  role!: string | null
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;
  isLoading = false
  clubInvitations: any[] = []
  public club!: Club

  constructor(private userService: UserService,
              private invitationService: InvitationService,
              private toast: MatSnackBar,
              private clubService: ClubService
              ) {
  }

  ngOnInit(): void {
    this.findPlayers()
    this.findRole()
    this.listClubInvitation()
    this.findClubIfExists()
  }

  findRole(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.role = response.body
      }
    })
  }

  findPlayers(){
    this.userService.getAllPlayers(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Player>) => {
        this.players = page.content;
        console.log(this.players)
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
        this.loadImages()
      },
      error: (err) => console.error('Error finding players:', err)
    });
  }

  listClubInvitation(){
    this.invitationService.clubAlreadyInvitedPlayer().subscribe(response=>{
      if(response.ok){
        this.clubInvitations = response.body
        console.log(this.clubInvitations)
      }
    })
  }

  findClubIfExists(){
    this.clubService.findIfExists().subscribe(response=>{
      if(response.ok){
        this.club = response.body as Club
      }
    })
  }

  playerCanBeInvited(playerId: number): boolean {
    const hasAcceptedInvitation = this.clubInvitations.some(
      invitation => invitation.recipient.id === playerId && invitation.status === "Aceite"
    );

    if (hasAcceptedInvitation) {
      return false;
    }
    const hasPendingOrAcceptedInvitationFromSameClub = this.clubInvitations.some(
      invitation =>
        invitation.recipient.id === playerId &&
        invitation.club.id === this.club.id &&
        invitation.status !== "Rejeitado"
    );

    return !hasPendingOrAcceptedInvitationFromSameClub;
  }



  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.findPlayers();
    }
  }

  loadImages(): void {
    const players = this.players
    const playersIds = players.map((player: { id: any; }) => player.id);
    playersIds.forEach((id: number) =>{
      this.showPhoto(id);
    })
  }

  showPhoto(id: number){
    this.userService.showPhoto(id).subscribe({
      next: (response) => {
        this.imageUrls[id] = window.URL.createObjectURL(response);
      },
      error: (error) => {
        console.error('Error loading image', error);
      }
    })
  }

  invitePlayer(id: number){
    this.isLoading = true;
    this.invitationService.invitePlayer(id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false
        this.toast.open("Convite Enviado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      } else {
        this.isLoading = false
        this.toast.open("Erro ao enviar convite", 'Fechar', {
          duration: 1000
        })
      }
    })
  }


}
