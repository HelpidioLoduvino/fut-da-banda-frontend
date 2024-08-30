import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {SharedModule} from "../../../../shared/shared.module";
import {ChampionshipService} from "../../../../core/services/championship.service";
import {FieldService} from "../../../../core/services/field.service";
import {Championship} from "../../../../core/models/Championship";
import {Field} from "../../../../core/models/Field";
import {Club} from "../../../../core/models/Club";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Game} from "../../../../core/models/Game";
import {GameService} from "../../../../core/services/game.service";

@Component({
  selector: 'app-admin-match',
  standalone: true,
    imports: [
        MatTab,
        MatTabGroup,
        SharedModule
    ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{

  championships: Championship[] = []
  fields: Field[] = []
  filteredClubs: Club[] = [];
  gameForm!: FormGroup
  matchDay: number = 1
  isLoading = false
  errorMessage = ''
  selectedChampionship: any;
  championshipId!: number
  selectedField!: number;
  selectedFirstClub!: number;
  selectedSecondClub!: number;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  scheduleGames: any[] = []
  championshipName = ''


  constructor(private championshipService: ChampionshipService,
              private fieldService: FieldService,
              private gameService: GameService,
              private formBuilder: FormBuilder,
              private toast: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({
      dateTime: ['', Validators.required],
      matchDay: ['', Validators.required],
    })
    this.loadFields()
    this.loadChampionships()
  }

  loadChampionships(){
    this.championshipService.list().subscribe(response=>{
      this.championships = response as Championship[]
    })
  }

  loadFields(){
    this.fieldService.list().subscribe(response=>{
      this.fields = response as Field[]
    })
  }

  onChampionshipChange(event: Event) {
    const selectedChampionshipId = Number((event.target as HTMLSelectElement).value);
    this.selectedChampionship = this.championships.find(championship => championship.id === selectedChampionshipId);
    this.filteredClubs = this.selectedChampionship ? this.selectedChampionship.clubs : [];
    this.championshipId = selectedChampionshipId
  }

  onFieldChange(event: any) {
    this.selectedField = Number(event.target.value);
  }

  onFirstClubChange(event: any) {
    this.selectedFirstClub = Number(event.target.value);
  }

  onSecondClubChange(event: any) {
    this.selectedSecondClub = Number(event.target.value);
  }


  save(){
    if(this.gameForm.valid){
      this.isLoading = true
      this.errorMessage = ''
      const game = this.gameForm.value;

      this.gameService.create(game, this.championshipId,
        this.selectedField, this.selectedFirstClub, this.selectedSecondClub)
        .subscribe(response=>{
        if(response.ok){
          this.isLoading = false
          this.toast.open("Jogo marcado", 'Fechar', {
            duration: 1000
          })
          setTimeout(() =>{
            window.location.reload()
          }, 1000)
        } else {
          this.isLoading = false
          this.toast.open("Erro ao marcar Jogo", 'Fechar', {
            duration: 1000
          })
          setTimeout(() =>{
            window.location.reload()
          }, 1000)
        }
      })

    } else {
      this.isLoading = false;
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      return;
    }
  }

  protected readonly eval = eval;
}
