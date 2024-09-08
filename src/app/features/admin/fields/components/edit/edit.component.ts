import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  image!: File
  isLoading = false

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
      type: [''],
      geolocation: [''],
      price: [''],
      status: ['']
    })
    this.details()
  }

  onImageFileChange(event: any) {
    if(event.target.files.length > 0){
      this.image = event.target.files[0];
    }
  }

  details(){
    this.fieldService.findById(this.id).subscribe({
      next: (response=>{
        this.field = response as Field
        this.fieldForm.patchValue({
          name: this.field.name,
          location: this.field.location,
          geolocation: this.field.geolocation,
          type: this.field.type,
          price: this.field.price,
          status: this.field.status
        })
      })
    })

  }

  update(){
    if(this.fieldForm.valid){
      this.isLoading = true
      const field: Field = this.fieldForm.value
      this.fieldService.update(field, this.image, this.id).subscribe({
        next: (response=>{
          this.isLoading = false
          this.snackBar.open("Campo atualizado com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
      })
    }
  }

}
