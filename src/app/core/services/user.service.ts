import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable, tap} from "rxjs";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {Player} from "../models/Player";
import {Page} from "../models/Page";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = `${environment.backendUrl}/users`;
  private token = localStorage.getItem('token');
  private refreshToken: string | null = localStorage.getItem('refreshToken');

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user: User){
    return this.http.post<User>(this.backendUrl, user, {observe: "response"});
  }

  registerPlayer(player: Player, photo: File) {
    const formData: FormData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    formData.append('photo', photo);
    return this.http.post<any>(`${this.backendUrl}/player`, formData, {observe: "response"});
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.backendUrl}/login`, credentials);
  }

  showPhoto(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/display/${id}`, { responseType: 'blob' });
  }

  getAll(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<User>>(this.backendUrl, {params});
  }

  getAllPlayers(page: number, size: number){
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Player>>(`${this.backendUrl}/players`, {params});
  }

  findById(id: number): Observable<HttpResponse<User>>{
    return this.http.get<User>(`${this.backendUrl}/${id}`, {observe: "response"})
  }

  findRole(): Observable<HttpResponse<string>>{
    return this.http.get(`${this.backendUrl}/role`, { observe: "response", responseType: 'text' });
  }

  findUserByRole(role: string){
    const params = new HttpParams().set('role', role)
    return this.http.get<User>(`${this.backendUrl}/user`, {observe: "response", params})
  }

  getAuthenticated(){
    return this.http.get<User>(`${this.backendUrl}/authenticated`, {observe: "response"})
  }

  getPlayer(){
    return this.http.get<Player>(`${this.backendUrl}/player`)
  }

  update(user: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(this.backendUrl, user, {observe: "response", params});
  }

  isPlayerAvailable(){
    return this.http.get<any>(`${this.backendUrl}/available`, {observe: "response"})
  }

  updatePlayer(player: any, id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/player`, player, {observe: "response", params});
  }

  updatePhoto(photo: File, id: number){
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/photo`, formData, {observe: "response", params});
  }

  ban(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/ban`, null,{params, observe: "response"})
  }

  unban(id: number){
    const params = new HttpParams().set('id', id.toString())
    return this.http.put(`${this.backendUrl}/unban`, null,{params, observe: "response"})
  }

  refreshTokenRequest(): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/token`, { refreshToken: this.refreshToken }).pipe(
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
    this.router.navigate(['']).then();
  }

}
