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

  private backendUrl = `${environment.backendUrl}/fields`;

  constructor(private http: HttpClient) { }

  register(field: Field, image: File){
    const formData: FormData = new FormData();
    formData.append('field', new Blob([JSON.stringify(field)], { type: 'application/json' }));
    formData.append('photo', image);
    return this.http.post<Field>(this.backendUrl, formData)
  }

  all(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Field>>(this.backendUrl, {params})
  }

  list(){
    return this.http.get<Field[]>(`${this.backendUrl}/list`);
  }

  findById(id: number): Observable<Field>{
    return this.http.get<Field>(`${this.backendUrl}/${id}`)
  }

  displayCover(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/display/${id}`, { responseType: 'blob' });
  }

  update(field: Field, image: File, id: number){
    const formData: FormData = new FormData();
    formData.append('field', new Blob([JSON.stringify(field)], { type: 'application/json' }));
    formData.append('photo', image);
    const params = new HttpParams().set('id', id.toString())
    return this.http.put<Field>(this.backendUrl, formData, {params});
  }

}
