import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChampionshipService} from "../../../../../core/services/championship.service";

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
    private championshipService: ChampionshipService,
    private toast: MatSnackBar
  ) {
    this.id = data.componentData.id;
  }

  delete(){
    this.championshipService.delete(this.id).subscribe(response=>{
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
