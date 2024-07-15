import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environment";
import {Observable} from "rxjs";

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
    return this.http.post(`${this.backendUrl}/api/club/register`, formData, {observe: "response"});
  }

  getAll(){
    return this.http.get<any>(`${this.backendUrl}/api/club/all`);
  }

  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/club/display/${id}`, { responseType: 'blob' });
  }

}
