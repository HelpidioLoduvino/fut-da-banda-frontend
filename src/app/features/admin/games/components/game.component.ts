import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {SharedModule} from "../../../../shared/shared.module";
import {ChampionshipService} from "../../../../core/services/championship.service";
import {FieldService} from "../../../../core/services/field.service";

@Component({
  selector: 'app-admin-match',
  standalone: true,
    imports: [
        MatTab,
        MatTabGroup,
        NotificationComponent,
        SharedModule
    ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{

  championships: any[] = []
  fields: any[] = []

  constructor(private championshipService: ChampionshipService,
              private fieldService: FieldService
  ) {
  }

  ngOnInit(): void {
    this.loadChampionships()
    this.loadFields()
  }

  loadChampionships(){
    this.championshipService.list().subscribe(response=>{
      this.championships = response
    })
  }

  loadFields(){
    this.fieldService.list().subscribe(response=>{
      this.fields = response
    })
  }

}
