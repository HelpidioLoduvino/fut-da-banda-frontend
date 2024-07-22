import { Injectable } from '@angular/core';
import {environment} from "../environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  create(game: any){
    return this.http.post(`${this.backendUrl}/api/game/add`, game, {observe: "response"})
  }

  update(game: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.post(`${this.backendUrl}/api/game/update`, game, {params, observe: "response"})
  }

  getAll(){
    return this.http.get<any>(`${this.backendUrl}/api/game/all`);
  }

}
