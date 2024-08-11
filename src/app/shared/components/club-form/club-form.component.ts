import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubService} from "../../../core/services/club.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-club-form',
  standalone: true,
    imports: [
        SharedModule
    ],
  templateUrl: './club-form.component.html',
  styleUrl: './club-form.component.css'
})
export class ClubFormComponent implements OnInit{
  clubForm!: FormGroup
  logo!: File;
  selectedImageUrl: string | ArrayBuffer | null = null;

  constructor(private clubService: ClubService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.clubForm = this.formBuilder.group({
      name: ['', Validators.required],
      abv: ['', Validators.required],
      province: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      groupType: ['', Validators.required],
    });
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

  submit(){
    if(this.clubForm.valid && this.logo){
      const club = this.clubForm.value
      this.clubService.register(club, this.logo).subscribe(response=>{
        if(response.ok){
          this.snackBar.open("Clube criado com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.snackBar.open("Erro ao criar CLube", 'Fechar', {
            duration: 1000
          })
        }
      })
    } else {
      this.snackBar.open("Erro no Formulário!", 'Fechar', {
        duration: 1000
      })
    }
  }


}
