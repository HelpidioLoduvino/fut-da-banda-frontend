import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgOptimizedImage} from "@angular/common";
import {NotificationComponent} from "../../../../../core/components/notifications/notification.component";
import {UserService} from "../../../../../core/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {Page} from "../../../../../core/models/Page";
import {User} from "../../../../../core/models/User";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {EditComponent} from "../edit/edit.component";
import {SharedModule} from "../../../../../shared/shared.module";
import {RegisterFormComponent} from "../../../../../core/auth/register-form/register-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SaveComponent} from "../save/save.component";


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NotificationComponent,
    MatTab,
    MatTabGroup,
    NgOptimizedImage,
    SharedModule,
    RegisterFormComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  users: any[] = []
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;

  constructor(private userService: UserService,
              private modal: MatDialog,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.findUsers()
  }

  findUsers(){
    this.userService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (page: Page<User>) => {
        this.users = page.content;
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;
      },
      error: (err) => console.error('Error finding users:', err)
    });
  }

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.findUsers();
    }
  }

  ban(id: number){
    this.userService.ban(id).subscribe(response=>{
      if(response.ok){
        this.snackBar.open("Usuário bloqueado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
  }

  unban(id: number){
    this.userService.unban(id).subscribe(response=>{
      if(response.ok){
        this.snackBar.open("Usuário desbloqueado", 'Fechar', {
          duration: 1000
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
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


}
