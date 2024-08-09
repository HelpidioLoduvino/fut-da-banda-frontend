import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ClubService} from "../../../../../core/services/club.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {

  private id!: number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clubService: ClubService,
    private toast: MatSnackBar
  ) {
    this.id = data.componentData.id;
  }

  delete(){
    this.clubService.delete(this.id).subscribe(response=>{
      if(response.ok){
        this.toast.open("Registo apagado com sucesso!", 'Fechar', {
          duration: 1000
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else{
        this.toast.open("Falha ao apagar Registo!", 'Fechar', {
          duration: 1000
        })
      }
    })
  }

}
