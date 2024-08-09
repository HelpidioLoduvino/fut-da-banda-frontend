import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClubService} from "../../../../core/services/club.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BarChartComponent} from "../../dashboard/charts/bar-chart/bar-chart.component";
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../shared/shared.module";
import {NgOptimizedImage} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {DeleteComponent} from "./delete/delete.component";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {Club} from "../../../../core/models/Club";
import {Page} from "../../../../core/models/Page";
import {Router} from "@angular/router";
import {EditComponent} from "./edit/edit.component";


@Component({
  selector: 'app-admin-club',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    BarChartComponent,
    SharedModule,
    NotificationComponent,
    NgOptimizedImage,
  ],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit{

  clubForm!: FormGroup
  clubs: any[] = []
  logo!: File;
  selectedImageUrl: string | ArrayBuffer | null = null;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;


  constructor(private clubService: ClubService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private modal: MatDialog,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.clubForm = this.formBuilder.group({
      name: ['', Validators.required],
      abv: ['', Validators.required],
      province: ['', Validators.required],
      state: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      groupType: ['', Validators.required],
    });
    this.loadClubs()
  }


  loadClubs(): void {
    this.clubService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<Club>) => {
        this.clubs = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
      },
      error: (err) => console.error('Erro ao buscar clubes:', err)
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadClubs();
    }
  }

  onImageFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.logo = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  registerClub(){
    if(this.clubForm.valid && this.logo){
      const club = this.clubForm.value
      this.clubService.register(club, this.logo).subscribe(response=>{
        if(response.ok){
          this.snackBar.open("Clube criado com Sucesso", 'Fechar', {
            duration: 2000
          })
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          this.snackBar.open("Erro ao criar CLube", 'Fechar', {
            duration: 3000
          })
        }
      })
    } else {
      this.snackBar.open("Erro no Formulário!", 'Fechar', {
        duration: 3000
      })
    }
  }

  delete(id: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '400px',
      height: '200px',
      data: {
        component: DeleteComponent,
        componentData: { id: id}
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

  detail(id: number){
    this.router.navigate(['admin-clube' , id]).then()
  }

}
