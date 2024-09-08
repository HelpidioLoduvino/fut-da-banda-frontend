import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Club} from "../models/Club";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private backendUrl = `${environment.backendUrl}/clubs`;

  constructor(private http: HttpClient) { }

  register(club: any, logo: File){
    const formData: FormData = new FormData();
    formData.append('club', new Blob([JSON.stringify(club)], { type: 'application/json' }));
    formData.append('logo', logo);
    return this.http.post(this.backendUrl, formData, {observe: "response"});
  }

  getAll(page: number, size: number): Observable<Page<Club>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Club>>(this.backendUrl, { params });
  }

  findById(id: number): Observable<HttpResponse<Club>>{
    return this.http.get<Club>(`${this.backendUrl}/${id}`, {observe: "response"})
  }

  findIfExists(): Observable<HttpResponse<Club>>{
    return this.http.get<Club>(`${this.backendUrl}/exists`, {observe: "response"})
  }

  playerHasClub(): Observable<HttpResponse<any>>{
    return this.http.get<any>(`${this.backendUrl}/player`, {observe: "response"})
  }

  getPlayerClub(){
    return this.http.get<Club>(`${this.backendUrl}/club`)
  }

  isPlayerCaptain(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.get<any>(`${this.backendUrl}/captain`, {observe: "response", params})
  }

  update(club: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(this.backendUrl, club, {observe: "response", params});
  }

  updateEmblem(emblem: File, id: number){
    const formData: FormData = new FormData();
    formData.append('emblem', emblem);
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/emblem`, formData, {observe: "response", params});
  }

  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/display/${id}`, { responseType: 'blob' });
  }

  ban(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/ban`, null,{params, observe: "response"})
  }

  unban(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/unban`, null,{params, observe: "response"})
  }

  available(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.get<any>(`${this.backendUrl}/available`, {params})
  }

  getThree(){
    return this.http.get<Club[]>(`${this.backendUrl}/four`, {observe: "response"})
  }

}
