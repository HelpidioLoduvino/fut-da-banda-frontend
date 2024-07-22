import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {MatStep, MatStepLabel, MatStepper} from "@angular/material/stepper";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClubService} from "../../services/club.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-club',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    MatStepper,
    MatStep,
    MatStepLabel,
    ReactiveFormsModule
  ],
  templateUrl: './create-club.component.html',
  styleUrl: './create-club.component.css'
})
export class CreateClubComponent implements OnInit{

  clubForm!: FormGroup
  logo!: File;

  constructor(
    private clubService: ClubService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.clubForm = this.formBuilder.group({
      name: ['', Validators.required],
      abv: ['', Validators.required],
      province: ['', Validators.required],
      state: ['Amador', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      groupType: ['', Validators.required],
    })
  }

  onImageFileChange(event: any) {
    if(event.target.files.length > 0){
      this.logo = event.target.files[0];
    }
  }

  registerClub(){
    if(this.clubForm.valid && this.logo){
      const club = this.clubForm.value
      this.clubService.register(club, this.logo).subscribe(response=>{
        if(response.ok){
          this.snackBar.open("Clube criado com Sucesso", 'Fechar', {
            duration: 3000
          })
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          this.snackBar.open("Erro ao criar CLube", 'Fechar', {
            duration: 3000
          })
        }
      })
    } else {
      this.snackBar.open("Erro no Formulário!", 'Fechar', {
        duration: 3000
      })
    }
  }

}
