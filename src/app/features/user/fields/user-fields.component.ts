import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../../shared/components/navbar/navbar.component";
import {FooterComponent} from "../../../shared/components/footer/footer.component";
import {Field} from "../../../core/models/Field";
import {FieldService} from "../../../core/services/field.service";
import {Page} from "../../../core/models/Page";
import {Club} from "../../../core/models/Club";
import {LucideAngularModule} from "lucide-angular";
import {NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './user-fields.component.html',
  styleUrl: './user-fields.component.css'
})
export class UserFieldsComponent implements OnInit{

  fields: Field[] = []
  imageUrls: { [key: number]: string } = {};
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private fieldService: FieldService) {
  }

  ngOnInit(): void {
    this.loadFields()
  }

  loadFields(): void {
    this.fieldService.all(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Field>) => {
        this.fields = page.content as Field[];
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
        this.fields.forEach((field: Field) =>{
          this.displayCover(field.id!)
        })
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

  displayCover(id: number): void {
    this.fieldService.displayCover(id).subscribe({
      next: (response) => {
        this.imageUrls[id] = window.URL.createObjectURL(response);
      },
      error: (error) => {
        console.error('Error loading image', error);
      }
    });
  }

}
