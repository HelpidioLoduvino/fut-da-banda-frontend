import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FormBuilder} from "@angular/forms";
import {FieldService} from "../../../../../core/services/field.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedModule} from "../../../../../shared/shared.module";
import {Page} from "../../../../../core/models/Page";
import {Field} from "../../../../../core/models/Field";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {EditComponent} from "../edit/edit.component";
import {MatDialog} from "@angular/material/dialog";
import {SaveComponent} from "../save/save.component";


@Component({
  selector: 'app-admin-field',
  standalone: true,
    imports: [
        MatTabGroup,
        MatTab,
        SharedModule
    ],
  templateUrl: './field.component.html',
  styleUrl: './field.component.css'
})
export class FieldComponent implements OnInit{

  fields: any[] = [];
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;

  constructor(private fieldService: FieldService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private modal: MatDialog
              ) {
  }

  ngOnInit(): void {
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

  save(): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        component: SaveComponent,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  edit(id: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        component: EditComponent,
        componentData: { id: id}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
