import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {LucideAngularModule} from "lucide-angular";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgClass, NgIf} from "@angular/common";
import {UserService} from "../../../core/services/user.service";
import {ClubService} from "../../../core/services/club.service";
import {Club} from "../../../core/models/Club";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    FooterComponent,
    LucideAngularModule,
    RouterLink,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgClass,
    RouterLinkActive,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isSidebarOpened: boolean = false;
  public club!: Club
  role!: string | null

  constructor(private userService: UserService,
              private clubService: ClubService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findRole()
    this.findClubIfExists()
  }


  findRole(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.role = response.body
      }
    })
  }

  findClubIfExists(){
    this.clubService.findIfExists().subscribe(response=>{
      if(response.ok){
        this.club = response.body as Club
      }
    })
  }

  clubDetail(id: number){
    this.router.navigate(['/clube', id]);
  }


  isLogged(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.userService.logout();
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

}
