import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldService} from "../../../../core/services/field.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-admin-field',
  standalone: true,
    imports: [
        MatTabGroup,
        MatTab,
        NotificationComponent,
        SharedModule
    ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.css'
})
export class FieldComponent implements OnInit{

  fieldForm!: FormGroup
  fields: any[] = [];

  constructor(private fieldService: FieldService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar
              ) {
  }

  ngOnInit(): void {
    this.fieldForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      occupied: [false, Validators.required]
    })

    this.fieldService.all().subscribe(response=>{
      this.fields = response;
    })
  }

  register(){
    if(this.fieldForm.valid){
      const field = this.fieldForm.value;
      this.fieldService.register(field).subscribe(response=>{
        if(response.ok){
          this.snackBar.open("Campo Adicionado Com Sucesso", 'Fechar', {
            duration: 3000
          })
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
    } else {
      this.snackBar.open("Erro de Formulário", 'Fechar', {
        duration: 3000
      })
    }
  }

}
