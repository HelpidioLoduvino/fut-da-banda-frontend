import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Championship} from "../models/Championship";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  create(championship: any){
    return this.http.post(`${this.backendUrl}/api/championships`, championship, {observe: "response"})
  }

  getAll(page: number, size: number): Observable<Page<Championship>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Championship>>(`${this.backendUrl}/api/championships`, { params });
  }

  list(){
    return this.http.get<any>(`${this.backendUrl}/api/championships/list`);
  }

  findById(id: number): Observable<HttpResponse<Championship>>{
    return this.http.get<Championship>(`${this.backendUrl}/api/championships/${id}`, {observe: "response"})
  }

  update(championship: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/championships`, championship, {observe: "response", params});
  }

  ban(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/championships/ban`, null,{params, observe: "response"})
  }

  unban(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/championships/unban`, null,{params, observe: "response"})
  }

}
