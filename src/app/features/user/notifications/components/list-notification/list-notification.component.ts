import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../../../../shared/components/footer/footer.component";
import {NavbarComponent} from "../../../../../shared/components/navbar/navbar.component";
import {NgForOf} from "@angular/common";
import {SharedModule} from "../../../../../shared/shared.module";
import {InvitationService} from "../../../../../core/services/invitation.service";
import {UserService} from "../../../../../core/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClubService} from "../../../../../core/services/club.service";

@Component({
  selector: 'app-list-notification',
  standalone: true,
    imports: [
      SharedModule
    ],
  templateUrl: './list-notification.component.html',
  styleUrl: './list-notification.component.css'
})
export class ListNotificationComponent implements OnInit{

  sentInvitations: any[] = []
  captainInvitations: any[] = []
  playerInvitations: any[] = []
  role!: string | null
  isLoading = false
  playerHasClub = false

  constructor(private invitationService: InvitationService,
              private userService: UserService,
              private clubService: ClubService,
              private toast: MatSnackBar
              ) {}

  ngOnInit(): void {
    this.getSentInvitations()
    this.getCaptainInvitations()
    this.getPlayerInvitations()
    this.findRole()
    this.hasClub()
  }

  findRole(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.role = response.body
      }
    })
  }

  hasClub(){
    this.clubService.playerHasClub().subscribe(response=>{
      if(response.ok){
        this.playerHasClub = response.body
      }
    })
  }

  getSentInvitations(){
    this.invitationService.getAllSenderInvitationByUserId().subscribe(response=>{
      if(response.ok){
        this.sentInvitations = response.body
        console.log(this.sentInvitations)
      }
    })
  }

  getCaptainInvitations(){
    this.invitationService.getAllCaptainInvitationByUserId().subscribe(response=>{
      if(response.ok){
        this.captainInvitations = response.body
        console.log(this.captainInvitations)
      }
    })
  }

  getPlayerInvitations(){
    this.invitationService.getAllPlayerInvitationByUserId().subscribe(response=>{
      if(response.ok){
        this.playerInvitations = response.body
      }
    })
  }

  acceptInvitation(id: number){
    this.isLoading = true;
    this.invitationService.acceptInvitation(id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false;
        this.toast.open("Convite aceite", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      } else {
        this.isLoading = false;
        this.toast.open("Erro ao aceitar convite", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      }
    })
  }

  acceptPlayerPermission(id: number){
    this.isLoading = true;
    this.invitationService.acceptPlayerPermission(id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false;
        this.toast.open("Pedido aceite", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      } else {
        this.isLoading = false;
        this.toast.open("Erro ao aceitar pedido", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      }
    })
  }

  rejectInvitation(id: number){
    this.isLoading = true;
    this.invitationService.rejectInvitation(id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false;
        this.toast.open("Convite rejeitado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      } else {
        this.isLoading = false;
        this.toast.open("Erro ao rejeitar convite", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      }
    })
  }

  rejectPlayerPermission(id: number){
    this.isLoading = true;
    this.invitationService.rejectPlayerPermission(id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false;
        this.toast.open("Pedido rejeitado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      } else {
        this.isLoading = false;
        this.toast.open("Erro ao rejeitar pedido", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      }
    })
  }

}
