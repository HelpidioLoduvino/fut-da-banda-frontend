import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldService} from "../../../../core/services/field.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../shared/shared.module";
import {Page} from "../../../../core/models/Page";
import {Club} from "../../../../core/models/Club";
import {Field} from "../../../../core/models/Field";

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
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;

  constructor(private fieldService: FieldService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar
              ) {
  }

  ngOnInit(): void {
    this.fieldForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      state: ['', Validators.required]
    })
    this.loadFields()
  }

  loadFields(){
    this.fieldService.all(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Field>) => {
        this.fields = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
      },
      error: (err) => console.error('Erro ao buscar clubes:', err)
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadFields();
    }
  }

  register(){
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
