import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment";

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  register(field: any){
    return this.http.post(`${this.backendUrl}/api/field/register`, field, {observe: "response"})
  }

  all(){
    return this.http.get<any>(`${this.backendUrl}/api/field/all`)
  }

}
