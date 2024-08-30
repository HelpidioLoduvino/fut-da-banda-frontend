import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../models/Game";
import {Page} from "../models/Page";
import {GameStat} from "../models/GameStat";
import {PlayerStat} from "../models/PlayerStat";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  create(game: Game, champId: number, fieldId: number, firstClubId: number, secondClubId: number){
    const params = new HttpParams()
      .set('championshipId', champId.toString())
      .set('fieldId', fieldId.toString())
      .set('firstClubId', firstClubId.toString())
      .set('secondClubId', secondClubId.toString())
    return this.http.post<Game>(`${this.backendUrl}/games`, game, {observe: "response", params})
  }

  getAllByMatchDayAndChampionship(page: number, size: number, matchDay: number, id: number): Observable<Page<Game>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('matchDay', matchDay.toString())
      .set('champId', id.toString())
    return this.http.get<Page<Game>>(`${this.backendUrl}/games`, { params });
  }

  findById(id: number): Observable<HttpResponse<Game>>{
    return this.http.get<Game>(`${this.backendUrl}/games/${id}`, {observe: "response"})
  }

  update(match: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/games`, match, {observe: "response", params});
  }

  delete(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.delete(`${this.backendUrl}/games`, {params, observe: "response"})
  }

  startGame(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put<Game>(`${this.backendUrl}/games/start`, null,{params, observe: "response"})
  }

  stopGame(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put<Game>(`${this.backendUrl}/games/stop`, null,{params, observe: "response"})
  }

  getGameStat(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.get<any>(`${this.backendUrl}/games/statistic`,{params, observe: "response"})
  }

  getClubStat(gameId: number, clubId: number){
    const params = new HttpParams()
      .set('game', gameId.toString())
      .set('club', clubId.toString())
    return this.http.get<GameStat>(`${this.backendUrl}/games/club-stat`,{params, observe: "response"})
  }

  getPlayerStat(gameId: number){
    const params = new HttpParams()
      .set('game', gameId.toString())
    return this.http.get<PlayerStat[]>(`${this.backendUrl}/games/player-stat`,{params, observe: "response"})
  }

  addClubStat(gameId: number, clubId: number, statistic: string){
    const params = new HttpParams()
      .set('gameId', gameId.toString())
      .set('clubId', clubId.toString())
      .set('statistic', statistic.toString())
    return this.http.put<void>(`${this.backendUrl}/games/club-add-stat`, null,{params, observe: "response"})
  }

  removeClubStat(gameId: number, clubId: number, statistic: string){
    const params = new HttpParams()
      .set('gameId', gameId.toString())
      .set('clubId', clubId.toString())
      .set('statistic', statistic.toString())
    return this.http.put<void>(`${this.backendUrl}/games/club-remove-stat`, null,{params, observe: "response"})
  }

  addPlayerStat(gameId: number, playerId: number, statistic: string){
    const params = new HttpParams()
      .set('gameId', gameId.toString())
      .set('playerId', playerId.toString())
      .set('statistic', statistic.toString())
    return this.http.put<void>(`${this.backendUrl}/games/player-add-stat`, null,{params, observe: "response"})
  }

  removePlayerStat(gameId: number, playerId: number, statistic: string){
    const params = new HttpParams()
      .set('gameId', gameId.toString())
      .set('playerId', playerId.toString())
      .set('statistic', statistic.toString())
    return this.http.put<void>(`${this.backendUrl}/games/player-remove-stat`, null,{params, observe: "response"})
  }

  findFourByChampionshipId(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.get<Game[]>(`${this.backendUrl}/games/four`,{params, observe: "response"})
  }

}
