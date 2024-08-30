import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldService} from "../../../../../core/services/field.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedModule} from "../../../../../shared/shared.module";
import {Field} from "../../../../../core/models/Field";


@Component({
  selector: 'app-save',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './save.component.html',
  styleUrl: './save.component.css'
})
export class SaveComponent implements OnInit{

  fieldForm!: FormGroup
  isLoading = false
  image!: File

  constructor(private fieldService: FieldService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.fieldForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      geolocation: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  onImageFileChange(event: any) {
    if(event.target.files.length > 0){
      this.image = event.target.files[0];
    }
  }

  submit(){
    if(this.fieldForm.valid){
      this.isLoading = true;
      const field: Field = this.fieldForm.value;
      this.fieldService.register(field, this.image).subscribe(response=>{
        if(response.ok){
          this.isLoading = false
          this.snackBar.open("Campo Adicionado Com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
    } else {
      this.isLoading = false
      this.snackBar.open("Erro de Formulário", 'Fechar', {
        duration: 1000
      })
    }
  }

}
