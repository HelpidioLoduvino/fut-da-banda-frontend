import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {Player} from "../models/Player";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = environment.backendUrl;
  private token = localStorage.getItem('token');
  private refreshToken: string | null = localStorage.getItem('refreshToken');

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User){
    return this.http.post<User>(`${this.backendUrl}/api/users`, user, {observe: "response"});
  }

  registerPlayer(player: Player, photo: File) {
    const formData: FormData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    formData.append('photo', photo);
    return this.http.post<any>(`${this.backendUrl}/api/users/player`, formData, {observe: "response"});
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.backendUrl}/api/users/login`, credentials);
  }

  showPhoto(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/users/display/${id}`, { responseType: 'blob' });
  }

  getAll(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<User>>(`${this.backendUrl}/api/users`, {params});
  }

  getAllPlayers(){
    return this.http.get<Player>(`${this.backendUrl}/api/users/players`, {observe: "response"});
  }

  update(user: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/clubs`, user, {observe: "response", params});
  }

  updatePhoto(photo: File, id: number){
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/api/users/photo`, formData, {observe: "response", params});
  }

  delete(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.delete(`${this.backendUrl}/api/users`, {params, observe: "response"})
  }

  refreshTokenRequest(): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/api/users/token`, { refreshToken: this.refreshToken }).pipe(
      tap(tokens => {
        this.token = tokens.token;
        this.refreshToken = tokens.refreshToken;
        if (typeof this.refreshToken === "string") {
          localStorage.setItem('refreshToken', this.refreshToken);
        }
      })
    );
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  logout (): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    localStorage.removeItem('userRole');
    this.router.navigate(['']).then();
  }
}
