import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgOptimizedImage} from "@angular/common";
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {UserService} from "../../../../core/services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {Page} from "../../../../core/models/Page";
import {User} from "../../../../core/models/User";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {DeleteComponent} from "./delete/delete.component";
import {EditComponent} from "./edit/edit.component";
import {SharedModule} from "../../../../shared/shared.module";
import {RegisterFormComponent} from "../../../../core/auth/register-form/register-form.component";

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
  photo!: File;
  selectedImageUrl: string | ArrayBuffer | null = null;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 4;

  constructor(private userService: UserService,
              private modal: MatDialog
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

  onImageFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photo = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImageUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
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


}
