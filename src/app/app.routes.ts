import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {MatchComponent} from "./components/match/match.component";
import {PlayersComponent} from "./components/players/players.component";
import {ClubsComponent} from "./components/clubs/clubs.component";
import {ClassificationComponent} from "./components/classification/classification.component";
import {TransferMarketComponent} from "./components/transfer-market/transfer-market.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ClubComponent} from "./components/club/club.component";
import {CreateClubComponent} from "./components/create-club/create-club.component";
import {AdminComponent} from "./components/admin/admin/admin.component";
import {AdminClubComponent} from "./components/admin/admin-club/admin-club.component";
import {AdminChampionshipComponent} from "./components/admin/admin-championship/admin-championship.component";
import {AdminPlayerComponent} from "./components/admin/admin-player/admin-player.component";
import {AdminMatchComponent} from "./components/admin/admin-match/admin-match.component";
import {AdminFieldComponent} from "./components/admin/admin-field/admin-field.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'partidas', component: MatchComponent},
  {path: 'jogadores', component: PlayersComponent},
  {path: 'clubes', component: ClubsComponent},
  {path: 'clube', component: ClubComponent},
  {path: 'tabela-classificação', component: ClassificationComponent},
  {path: 'mercado-transferência', component: TransferMarketComponent},
  {path: 'entrar', component: LoginComponent},
  {path: 'registar', component: RegisterComponent},
  {path: 'registar-clube', component: CreateClubComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'admin-clubes', component: AdminClubComponent},
  {path: 'admin-campeonatos', component: AdminChampionshipComponent},
  {path: 'admin-jogadores', component: AdminPlayerComponent},
  {path: 'admin-partidas', component: AdminMatchComponent},
  {path: 'admin-campos', component: AdminFieldComponent}
];
