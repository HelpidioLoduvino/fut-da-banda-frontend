import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClubService} from "../../../core/services/club.service";

@Component({
  selector: 'app-change-emblem',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './change-emblem.component.html',
  styleUrl: './change-emblem.component.css'
})
export class ChangeEmblemComponent {

  logo!: File;
  selectedImageUrl: string | ArrayBuffer | null = null;
  id!: number
  isLoading = false

  constructor(private clubService: ClubService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast: MatSnackBar
  ) {
    this.id = data.componentData.id
  }

  onImageFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.logo = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  update(){
    this.isLoading = true
    this.clubService.updateEmblem(this.logo, this.id).subscribe(response=>{
      if(response.ok){
        this.isLoading = false
        this.toast.open("Emblema atualizado com sucesso!", 'Fechar', {
          duration: 1000
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }

}
