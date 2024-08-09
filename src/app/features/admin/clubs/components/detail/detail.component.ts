import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClubService} from "../../../../../core/services/club.service";
import {Club} from "../../../../../core/models/Club";
import {AdminNavbarComponent} from "../../../../../shared/components/admin-navbar/admin-navbar.component";
import {AdminSidebarComponent} from "../../../../../shared/components/admin-sidebar/admin-sidebar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LucideAngularModule} from "lucide-angular";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NotificationComponent} from "../../../../../core/components/notifications/notification.component";
import {ModalComponent} from "../../../../../shared/components/modal/modal.component";
import {EditComponent} from "../edit/edit.component";
import {MatDialog} from "@angular/material/dialog";
import {ChangeEmblemComponent} from "../change-emblem/change-emblem.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    AdminSidebarComponent,
    FormsModule,
    LucideAngularModule,
    MatTab,
    MatTabGroup,
    NgForOf,
    NgIf,
    NotificationComponent,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit{

  private id!: number
  public club!: Club;
  imageUrl: { [key: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private modal: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['id'];
      if(this.id){
        this.detail(this.id)
        this.displayCover(this.id)
      }
    })
  }

  detail(id: number){
    this.clubService.findById(id).subscribe(response=>{
      if(response.ok){
        this.club = response.body as Club
      }
    })
  }

  changeEmblem(id: number): void {
    const dialogRef = this.modal.open(ModalComponent, {
      width: '500px',
      height: '400px',
      data: {
        component: ChangeEmblemComponent,
        componentData: { id: id}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  displayCover(id: number): void {
    this.clubService.displayCover(id).subscribe({
      next: (response) => {
        this.imageUrl[id] = window.URL.createObjectURL(response);
      },
      error: (error) => {
        console.error('Error loading cover', error);
      }
    });
  }

}
