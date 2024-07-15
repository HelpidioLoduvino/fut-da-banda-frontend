import {Component, OnInit} from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldService} from "../../../services/field.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-field',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule,
    MatTabGroup,
    MatTab,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './admin-field.component.html',
  styleUrl: './admin-field.component.css'
})
export class AdminFieldComponent implements OnInit{

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
