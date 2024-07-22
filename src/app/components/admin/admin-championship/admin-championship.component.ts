import {Component, OnInit} from '@angular/core';
import {AdminNavbarComponent} from "../admin-navbar/admin-navbar.component";
import {LucideAngularModule} from "lucide-angular";
import {IconsModule} from "../../../icons/icons.module";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {AdminNotificationComponent} from "../admin-notification/admin-notification.component";
import {AdminSidebarComponent} from "../admin-sidebar/admin-sidebar.component";
import {BarChartComponent} from "../bar-chart/bar-chart.component";
import {ChampionshipService} from "../../../services/championship.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {timeout} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-championship',
  standalone: true,
  imports: [
    AdminNavbarComponent,
    LucideAngularModule,
    IconsModule,
    MatTab,
    MatTabGroup,
    AdminNotificationComponent,
    AdminSidebarComponent,
    BarChartComponent,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './admin-championship.component.html',
  styleUrl: './admin-championship.component.css'
})
export class AdminChampionshipComponent implements OnInit{

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
