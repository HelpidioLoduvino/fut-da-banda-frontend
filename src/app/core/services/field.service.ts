import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {Field} from "../models/Field";
import {Page} from "../models/Page";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  register(field: any){
    return this.http.post(`${this.backendUrl}/api/fields`, field, {observe: "response"})
  }

  all(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Field>>(`${this.backendUrl}/api/fields`, {params})
  }

  list(){
    return this.http.get<any>(`${this.backendUrl}/api/fields/list`);
  }

  findById(id: number): Observable<HttpResponse<Field>>{
    return this.http.get<Field>(`${this.backendUrl}/api/fields/${id}`, {observe: "response"})
  }

  update(field: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/fields`, field, {observe: "response", params});
  }

}
