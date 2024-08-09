import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {Observable} from "rxjs";
import {Club} from "../models/Club";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  register(club: any, logo: File){
    const formData: FormData = new FormData();
    formData.append('club', new Blob([JSON.stringify(club)], { type: 'application/json' }));
    formData.append('logo', logo);
    return this.http.post(`${this.backendUrl}/api/clubs`, formData, {observe: "response"});
  }

  getAll(page: number, size: number): Observable<Page<Club>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Club>>(`${this.backendUrl}/api/clubs`, { params });
  }

  findById(id: number): Observable<HttpResponse<Club>>{
    return this.http.get<Club>(`${this.backendUrl}/api/clubs/${id}`, {observe: "response"})
  }

  update(club: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/clubs`, club, {observe: "response", params});
  }

  updateEmblem(emblem: File, id: number){
    const formData: FormData = new FormData();
    formData.append('emblem', emblem);
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/clubs/emblem`, formData, {observe: "response", params});
  }

  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/clubs/display/${id}`, { responseType: 'blob' });
  }

  delete(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.delete(`${this.backendUrl}/api/clubs`, {params, observe: "response"})
  }

}
