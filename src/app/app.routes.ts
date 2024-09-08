import { Routes } from '@angular/router';
import {HomeComponent} from "./features/user/home/components/home.component";
import {ClubsComponent} from "./features/user/clubs/components/list/clubs.component";
import {LoginComponent} from "./core/auth/login/login.component";
import {RegisterComponent} from "./core/auth/register/register.component";
import {CreateClubComponent} from "./features/user/clubs/components/create/create-club.component";
import {DashboardComponent} from "./features/admin/dashboard/components/dashboard.component";
import {ClubComponent} from "./features/admin/clubs/components/list/club.component";
import {ChampionshipComponent} from "./features/admin/championships/components/list/championship.component";
import {GameComponent} from "./features/admin/games/components/game.component";
import {FieldComponent} from "./features/admin/fields/components/list/field.component";
import {DetailComponent} from "./features/admin/clubs/components/detail/detail.component";
import {UserComponent} from "./features/admin/users/components/list/user.component";
import {PlayersComponent} from "./features/admin/users/components/players/players.component";
import {
  ListChampionshipComponent
} from "./features/user/championships/components/list/championship/list-championship.component";
import {ListPlayersComponent} from "./features/user/players/components/list/list-players/list-players.component";
import {UserClubDetailComponent} from "./features/user/clubs/components/detail/user-club-detail.component";
import {
  UserChampionshipDetailComponent
} from "./features/user/championships/components/detail/detail/user-championship-detail.component";
import {
  ListNotificationComponent
} from "./features/user/notifications/components/list-notification/list-notification.component";
import {
  AdminChampionshipComponent
} from "./features/admin/championships/components/admin-championship/admin-championship.component";
import {GameDetailComponent} from "./shared/components/game-detail/game-detail.component";
import {
  AdminGameDetailComponent
} from "./features/admin/games/components/admin-game-detail/admin-game-detail.component";
import {
  UserGameDetailComponent
} from "./features/user/games/components/detail/user-game-detail/user-game-detail.component";
import {ProfileComponent} from "./features/user/profile/profile.component";
import {UserFieldsComponent} from "./features/user/fields/user-fields.component";

export const routes: Routes = [

  // User routes
  {path: '', component: HomeComponent},
  {path: 'perfil', component: ProfileComponent},
  {path: 'partidas', component: GameComponent},
  {path: 'jogadores', component: ListPlayersComponent},
  {path: 'clubes', component: ClubsComponent},
  {path: 'campos', component: UserFieldsComponent},
  {path: 'clube/:id', component: UserClubDetailComponent},
  {path: 'entrar', component: LoginComponent},
  {path: 'registar', component: RegisterComponent},
  {path: 'registar-clube', component: CreateClubComponent},
  {path: 'campeonatos', component: ListChampionshipComponent},
  {path: 'campeonato/:id', component: UserChampionshipDetailComponent},
  {path: 'notificações', component: ListNotificationComponent},
  {path: 'jogo/:id', component: UserGameDetailComponent},

  //Admin routes
  {path: 'dashboard', component: DashboardComponent},
  {path: 'admin-clubes', component: ClubComponent},
  {path: 'admin-clube/:id', component: DetailComponent},
  {path: 'admin-campeonatos', component: ChampionshipComponent},
  {path: 'admin-campeonato/:id', component: AdminChampionshipComponent},
  {path: 'admin-usuarios', component: UserComponent},
  {path: 'admin-partidas', component: GameComponent},
  {path: 'admin-jogo/:id', component: AdminGameDetailComponent},
  {path: 'admin-campos', component: FieldComponent},
  {path: 'admin-jogadores', component: PlayersComponent}
];
