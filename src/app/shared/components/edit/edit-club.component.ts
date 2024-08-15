import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedModule} from "../../shared.module";
import {Club} from "../../../core/models/Club";
import {ClubService} from "../../../core/services/club.service";


@Component({
  selector: 'app-edit',
  standalone: true,
    imports: [
        FormsModule,
        SharedModule
    ],
  templateUrl: './edit-club.component.html',
  styleUrl: './edit-club.component.css'
})
export class EditClubComponent implements OnInit{

  clubForm!: FormGroup
  public club!: Club
  private id!: number
  isLoading = false

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
      this.isLoading = true
      const club = this.clubForm.value
      this.clubService.update(club, this.id).subscribe(response=>{
        if(response.ok){
          this.isLoading = false
          this.snackBar.open("Clube atualizado com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.isLoading = false
          this.snackBar.open("Erro ao atualizar clube", 'Fechar', {
            duration: 1000
          })
        }
      })
    }
  }

}
