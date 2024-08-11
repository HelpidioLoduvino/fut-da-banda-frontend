import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Field} from "../../../../../core/models/Field";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FieldService} from "../../../../../core/services/field.service";
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

  fieldForm!: FormGroup
  public field!: Field
  private id!: number

  constructor(private fieldService: FieldService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
    this.id = data.componentData.id;
  }

  ngOnInit(): void {
    this.fieldForm = this.formBuilder.group({
      name: [''],
      location: [''],
      status: ['']
    })
    this.details()
  }

  details(){
    this.fieldService.findById(this.id).subscribe(response=>{
      if(response.ok){
        this.field = response.body as Field
        this.fieldForm.patchValue({
          name: this.field.name,
          location: this.field.location,
          status: this.field.status
        })
      }
    })
  }

  update(){
    if(this.fieldForm.valid){
      const field = this.fieldForm.value
      this.fieldService.update(field, this.id).subscribe(response=>{
        if(response.ok){
          this.snackBar.open("Campo atualizado com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else{
          this.snackBar.open("Erro ao atualizar campo", 'Fechar', {
            duration: 1000
          })
        }
      })
    }
  }

}
