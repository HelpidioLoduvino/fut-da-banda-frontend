import { Routes } from '@angular/router';
import {HomeComponent} from "./features/user/home/components/home.component";
import {ClubsComponent} from "./features/user/clubs/components/list/clubs.component";
import {LoginComponent} from "./core/auth/login/login.component";
import {RegisterComponent} from "./core/auth/register/register.component";
import {CreateClubComponent} from "./features/user/clubs/components/create/create-club.component";
import {DashboardComponent} from "./features/admin/dashboard/components/dashboard.component";
import {ClubComponent} from "./features/admin/clubs/components/club.component";
import {ChampionshipComponent} from "./features/admin/championships/components/championship.component";
import {PlayerComponent} from "./features/admin/players/components/player.component";
import {MatchComponent} from "./features/admin/matches/components/match.component";
import {FieldComponent} from "./features/admin/fields/components/field.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'partidas', component: MatchComponent},
  {path: 'jogadores', component: PlayerComponent},
  {path: 'clubes', component: ClubsComponent},
  {path: 'clube', component: ClubComponent},
  {path: 'entrar', component: LoginComponent},
  {path: 'registar', component: RegisterComponent},
  {path: 'registar-clube', component: CreateClubComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'admin-clubes', component: ClubComponent},
  {path: 'admin-campeonatos', component: ChampionshipComponent},
  {path: 'admin-jogadores', component: PlayerComponent},
  {path: 'admin-partidas', component: MatchComponent},
  {path: 'admin-campos', component: FieldComponent}
];
