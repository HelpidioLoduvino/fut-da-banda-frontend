import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  countUsers(){
    return this.http.get<any>(`${this.backendUrl}/api/statistics/users`, {observe: "response"})
  }

  countPlayers(){
    return this.http.get<any>(`${this.backendUrl}/api/statistics/players`, {observe: "response"})
  }

  countClubs(){
    return this.http.get<any>(`${this.backendUrl}/api/statistics/clubs`, {observe: "response"})
  }

  countChampionships(){
    return this.http.get<any>(`${this.backendUrl}/api/statistics/championships`, {observe: "response"})
  }

  countFields(){
    return this.http.get<any>(`${this.backendUrl}/api/statistics/fields`, {observe: "response"})
  }

}
