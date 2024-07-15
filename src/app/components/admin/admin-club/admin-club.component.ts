import {Component, OnInit} from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClubService} from "../../../services/club.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-club',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule,
    MatTab,
    MatTabGroup,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './admin-club.component.html',
  styleUrl: './admin-club.component.css'
})
export class AdminClubComponent implements OnInit{

  clubForm!: FormGroup
  clubs: any[] = []
  logo!: File;


  constructor(private clubService: ClubService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder
              ) {
  }

  ngOnInit(): void {
    this.clubForm = this.formBuilder.group({
      name: ['', Validators.required],
      abv: ['', Validators.required],
      province: ['', Validators.required],
      state: ['Profissional', Validators.required]
    })

    this.clubService.getAll().subscribe(response=>{
      this.clubs = response
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
