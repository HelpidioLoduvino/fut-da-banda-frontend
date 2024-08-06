import { Injectable } from '@angular/core';
import {environment} from "../environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  create(championship: any){
    return this.http.post(`${this.backendUrl}/api/championships`, championship, {observe: "response"})
  }

  getAll(){
    return this.http.get<any>(`${this.backendUrl}/api/championships`);
  }

}
