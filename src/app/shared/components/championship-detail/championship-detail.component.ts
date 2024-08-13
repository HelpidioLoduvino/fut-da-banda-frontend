import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared.module";
import {Championship} from "../../../core/models/Championship";
import {ChampionshipService} from "../../../core/services/championship.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-championship-detail',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './championship-detail.component.html',
  styleUrl: './championship-detail.component.css'
})
export class ChampionshipDetailComponent implements OnInit{

  championship!: Championship
  id!: number

  constructor(private championshipService: ChampionshipService,
              private route: ActivatedRoute
              ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['id']
      if(this.id){
        this.detail(this.id)
      }
    })
  }

  detail(id: number){
    this.championshipService.findById(id).subscribe(response=>{
      if(response.ok){
        this.championship = response.body as Championship
      }
    })
  }

}
