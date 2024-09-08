import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {LucideAngularModule} from "lucide-angular";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../../../core/services/user.service";
import {ClubService} from "../../../core/services/club.service";
import {Club} from "../../../core/models/Club";
import {InvitationService} from "../../../core/services/invitation.service";
import {User} from "../../../core/models/User";
import {Player} from "../../../core/models/Player";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

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
    NgOptimizedImage,
    FaIconComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  isSidebarOpened: boolean = false;
  club!: Club
  role!: string | null
  user!: User
  player!: Player
  unseenInvitations!: number
  imageUrl: { [key: number]: string } = {};
  playerHasClub: boolean = false

  constructor(private userService: UserService,
              private clubService: ClubService,
              private invitationService: InvitationService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.findRole()
    this.findClubIfExists()
    this.countUnseenInvitation()
    this.findAuthenticatedUser()
    this.getPlayerClub()
    this.getPlayer()
  }


  findRole(){
    this.userService.findRole().subscribe(response=>{
      if(response.ok){
        this.role = response.body
      }
    })
  }

  findAuthenticatedUser(){
    this.userService.getAuthenticated().subscribe(response=>{
      if(response.ok){
        this.user = response.body as User
      }
    })
  }

  getPlayer(){
    this.userService.getPlayer().subscribe({
      next: (response=>{
        this.player = response as Player
        this.userPhoto(this.player.id!)
      })
    })
  }

  findClubIfExists(){
    this.clubService.findIfExists().subscribe(response=>{
      if(response.ok){
        this.club = response.body as Club
        this.displayImage(this.club.id)
      }
    })
  }

  getPlayerClub(){
    this.clubService.playerHasClub().subscribe(response=>{
      if(response.ok){
        this.playerHasClub = response.body
      }
    })
  }

  userPhoto(id: number){
    this.userService.showPhoto(id).subscribe({
      next: (response =>{
        this.imageUrl[id] = window.URL.createObjectURL(response);
      }), error: (error) => {
        console.error('Error loading image', error);
      }
    })
  }

  displayImage(id: number){
    this.clubService.displayCover(id).subscribe({
      next: (response =>{
        this.imageUrl[id] = window.URL.createObjectURL(response);
      }), error: (error) => {
        console.error('Error loading image', error);
      }
    })
  }

  countUnseenInvitation(){
    this.invitationService.countUnseen().subscribe(response=>{
      if(response.ok){
        this.unseenInvitations = response.body
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
