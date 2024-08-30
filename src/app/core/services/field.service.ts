import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Field} from "../models/Field";
import {Page} from "../models/Page";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  register(field: Field, image: File){
    const formData: FormData = new FormData();
    formData.append('field', new Blob([JSON.stringify(field)], { type: 'application/json' }));
    formData.append('photo', image);
    return this.http.post<Field>(`${this.backendUrl}/fields`, formData, {observe: "response"})
  }

  all(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Field>>(`${this.backendUrl}/fields`, {params})
  }

  list(){
    return this.http.get<Field[]>(`${this.backendUrl}/fields/list`);
  }

  findById(id: number): Observable<HttpResponse<Field>>{
    return this.http.get<Field>(`${this.backendUrl}/fields/${id}`, {observe: "response"})
  }

  update(field: Field, image: File, id: number){
    const formData: FormData = new FormData();
    formData.append('field', new Blob([JSON.stringify(field)], { type: 'application/json' }));
    formData.append('photo', image);
    const params = new HttpParams().set('id', id.toString())
    return this.http.put<Field>(`${this.backendUrl}/fields`, formData, {observe: "response", params});
  }

}
