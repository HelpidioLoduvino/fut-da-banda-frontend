import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubService} from "../../../core/services/club.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../core/services/user.service";

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
  role!: string | null
  isLoading = false;

  constructor(private clubService: ClubService,
              private snackBar: MatSnackBar,
              private userService: UserService,
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
    this.findRole()
  }

  findRole(){
    this.userService.findRole().subscribe(response=>{
      this.role = response.body
      if (this.role === 'CAPTAIN') {
        this.clubForm.patchValue({ status: 'Amador' });
      }
    })
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
      this.isLoading = true;
      const club = this.clubForm.value
      this.clubService.register(club, this.logo).subscribe(response=>{
        if(response.ok){
          this.isLoading = false;
          this.snackBar.open("Clube criado com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.isLoading = false;
          this.snackBar.open("Erro ao criar CLube", 'Fechar', {
            duration: 1000
          })
        }
      })
    } else {
      this.isLoading = false;
      this.snackBar.open("Erro no Formulário! Todos os campos devem ser preenchidos.", 'Fechar', {
        duration: 1000
      })
    }
  }


}
