import {Component, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NotificationComponent} from "../../../../core/components/notifications/notification.component";
import {BarChartComponent} from "../../dashboard/charts/bar-chart/bar-chart.component";
import {ChampionshipService} from "../../../../core/services/championship.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-admin-championship',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    NotificationComponent,
    BarChartComponent,
    SharedModule
  ],
  templateUrl: './championship.component.html',
  styleUrl: './championship.component.css'
})
export class ChampionshipComponent implements OnInit{

  championshipForm!: FormGroup
  championships: any[] = []

  constructor(private championshipService: ChampionshipService,
              private formBuilder: FormBuilder,
              private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.championshipForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      province: ['', Validators.required],
      groupType: ['', Validators.required],
      price: ['', Validators.required],
      matchDay: ['', Validators.required]
    })

    this.championshipService.getAll().subscribe(response=>{
      this.championships = response;
    })
  }

  submit(){
    if(this.championshipForm.valid){
      const championship = this.championshipForm.value
      this.championshipService.create(championship).subscribe(response=>{
        if(response.ok){
          this.snackbar.open("Campeonato criado com sucesso!", 'Fechar', {
            duration: 3000
          })
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          this.snackbar.open("Erro ao criar campeonato!", 'Fechar', {
            duration: 3000
          })
        }
      })
    } else {
      this.snackbar.open("Formulário Inválido", 'Fechar', {
        duration: 3000
      })
    }
  }

}
