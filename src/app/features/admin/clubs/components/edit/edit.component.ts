import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClubService} from "../../../../../core/services/club.service";
import {Club} from "../../../../../core/models/Club";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SharedModule} from "../../../../../shared/shared.module";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-edit',
  standalone: true,
    imports: [
        FormsModule,
        SharedModule
    ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  clubForm!: FormGroup
  public club!: Club
  private id!: number

  constructor(private clubService: ClubService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
    this.id = data.componentData.id;
  }

  ngOnInit(): void {
    this.clubForm = this.formBuilder.group({
      name: [''],
      abv: [''],
      province: [''],
      status: [''],
      description: [''],
      category: [''],
      groupType: [''],
    });
    this.detail()
  }

  detail(){
    this.clubService.findById(this.id).subscribe(response=>{
      if(response.ok){
        this.club = response.body as Club
        this.clubForm.patchValue({
          name: this.club.name,
          abv: this.club.abv,
          province: this.club.province,
          status: this.club.status,
          description: this.club.description,
          category: this.club.category,
          groupType: this.club.groupType,
        });
      }
    })
  }

  edit(){
    if(this.clubForm.valid){
      const club = this.clubForm.value
      this.clubService.update(club, this.id).subscribe(response=>{
        if(response.ok){
          this.snackBar.open("Clube atualizado com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.snackBar.open("Erro ao atualizar clube", 'Fechar', {
            duration: 1000
          })
        }
      })
    }
  }

}
