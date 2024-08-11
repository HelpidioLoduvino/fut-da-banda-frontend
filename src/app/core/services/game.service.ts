import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game} from "../models/Game";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  create(game: any){
    return this.http.post(`${this.backendUrl}/api/games`, game, {observe: "response"})
  }

  getAll(page: number, size: number): Observable<Page<Game>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Game>>(`${this.backendUrl}/api/games`, { params });
  }

  findById(id: number): Observable<HttpResponse<Game>>{
    return this.http.get<Game>(`${this.backendUrl}/api/games/${id}`, {observe: "response"})
  }

  update(match: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/games`, match, {observe: "response", params});
  }

  delete(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.delete(`${this.backendUrl}/api/games`, {params, observe: "response"})
  }

}
