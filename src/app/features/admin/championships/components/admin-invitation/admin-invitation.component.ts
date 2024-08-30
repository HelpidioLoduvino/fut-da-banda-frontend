import {Component, OnInit} from '@angular/core';
import {InvitationService} from "../../../../../core/services/invitation.service";
import {SharedModule} from "../../../../../shared/shared.module";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-invitations',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './admin-invitation.component.html',
  styleUrl: './admin-invitation.component.css'
})
export class AdminInvitationComponent implements OnInit{

  invitations: any[] = []
  isLoading = false

  constructor(private invitationService: InvitationService,
              private toast: MatSnackBar
              ) {
  }

  ngOnInit(): void {
    this.getInvitations()
  }

  getInvitations(){
    this.invitationService.listChampionshipInvitations().subscribe({
      next: (response => {
        this.invitations = response
      }), error: (error =>{
        console.error("Erro ao recuperar pedidos", error)
      })
    })
  }

  acceptInvitation(id: number){
    this.isLoading = true
    this.invitationService.acceptClubPermission(id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false
        this.toast.open("Clube Aceite", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      } else {
        this.isLoading = false
        this.toast.open("Erro ao aceitar Clube!", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      }
    })
  }

  rejectInvitation(id: number){
    this.isLoading = true
    this.invitationService.rejectClubPermission(id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false
        this.toast.open("Clube Rejeitado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      } else {
        this.isLoading = false
        this.toast.open("Erro ao rejeitar Clube!", 'Fechar', {
          duration: 1000
        })
        setTimeout(() =>{
          window.location.reload()
        }, 1000)
      }
    })
  }

}
