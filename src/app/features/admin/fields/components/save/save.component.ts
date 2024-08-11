import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldService} from "../../../../../core/services/field.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedModule} from "../../../../../shared/shared.module";


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

  constructor(private fieldService: FieldService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.fieldForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  submit(){
    if(this.fieldForm.valid){
      const field = this.fieldForm.value;
      this.fieldService.register(field).subscribe(response=>{
        if(response.ok){
          this.snackBar.open("Campo Adicionado Com Sucesso", 'Fechar', {
            duration: 1000
          })
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
    } else {
      this.snackBar.open("Erro de Formulário", 'Fechar', {
        duration: 1000
      })
    }
  }

}
