import {Component, OnInit} from '@angular/core';
import {BarChartComponent} from "../charts/bar-chart/bar-chart.component";
import {SharedModule} from "../../../../shared/shared.module";
import {User} from "../../../../core/models/User";
import {UserService} from "../../../../core/services/user.service";
import {StatisticService} from "../../../../core/services/statistic.service";


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    BarChartComponent,
    SharedModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  user!: User
  players!: number
  role!: string | null

  constructor(private userService: UserService,
              private statisticService: StatisticService
  ) {
  }

  ngOnInit(): void {
    this.userService.findRole().subscribe(response => {
      if (response.ok) {
        this.role = response.body;
        if (this.role) {
          this.userService.findUserByRole(this.role).subscribe(response => {
            if (response.ok) {
              this.user = response.body as User;
            }
          });
        } else {
          console.error('Role is undefined or null');
        }
      }
    });

    this.statisticService.countPlayers().subscribe(response=>{
      if(response.ok){
        this.players = response.body
      }
    })
  }

}
