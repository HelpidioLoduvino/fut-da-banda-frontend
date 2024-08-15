import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Championship} from "../../../../../core/models/Championship";
import {ChampionshipService} from "../../../../../core/services/championship.service";
import {SharedModule} from "../../../../../shared/shared.module";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  championshipForm!: FormGroup
  public championship!: Championship
  private id!: number
  isLoading = false

  constructor(private championshipService: ChampionshipService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
    this.id = data.componentData.id;
  }

  ngOnInit(): void {
    this.championshipForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      province: [''],
      groupType: [''],
      price: [''],
      matchDay: ['']
    })
    this.details()
  }

  details(){
    this.championshipService.findById(this.id).subscribe(response=>{
      if(response.ok){
        this.championship = response.body as Championship
        this.championshipForm.patchValue({
          name: this.championship.name,
          description: this.championship.description,
          category: this.championship.category,
          province: this.championship.province,
          groupType: this.championship.groupType,
          price: this.championship.price,
          matchDay: this.championship.matchDay
        })
      }
    })
  }

  edit(){
    if(this.championshipForm.valid){
      this.isLoading = true
      const championship = this.championshipForm.value
      this.championshipService.update(championship, this.id).subscribe(response=>{
        if(response.ok){
          this.isLoading = false
          this.snackBar.open("Campeonato atualizado com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          this.isLoading = false
          this.snackBar.open("Erro ao atualizar campeonato", 'Fechar', {
            duration: 1000
          })
        }
      })
    }
  }

}
