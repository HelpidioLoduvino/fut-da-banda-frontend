import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../../../../../shared/components/footer/footer.component";
import {LucideAngularModule} from "lucide-angular";
import {MatMenu} from "@angular/material/menu";
import {NavbarComponent} from "../../../../../../shared/components/navbar/navbar.component";
import {NgForOf} from "@angular/common";
import {
  ChampionshipDetailComponent
} from "../../../../../../shared/components/championship-detail/championship-detail.component";
import {InvitationService} from "../../../../../../core/services/invitation.service";
import {ChampionshipService} from "../../../../../../core/services/championship.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    FooterComponent,
    LucideAngularModule,
    MatMenu,
    NavbarComponent,
    NgForOf,
    ChampionshipDetailComponent
  ],
  templateUrl: './user-championship-detail.component.html',
  styleUrl: './user-championship-detail.component.css'
})
export class UserChampionshipDetailComponent implements OnInit{

  championshipId!: number
  isLoading = false

  constructor(private invitationService: InvitationService,
              private championshipService: ChampionshipService,
              private route: ActivatedRoute,
              private toast: MatSnackBar
              ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.championshipId = params['id'];
      if(this.championshipId){

      }
    })
  }

}
