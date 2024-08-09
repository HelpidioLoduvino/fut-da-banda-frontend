import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl = environment.backendUrl;
  private token = localStorage.getItem('token');
  private refreshToken: string | null = localStorage.getItem('refreshToken');

  constructor(private http: HttpClient, private router: Router) { }

  registerPlayer(player: any, photo: File) {
    const formData: FormData = new FormData();
    formData.append('player', new Blob([JSON.stringify(player)], { type: 'application/json' }));
    formData.append('photo', photo);
    return this.http.post<any>(`${this.backendUrl}/api/users`, formData, {observe: "response"});
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.backendUrl}/api/users/login`, credentials);
  }

  showPhoto(id: number): Observable<Blob> {
    return this.http.get(`${this.backendUrl}/api/users/display/${id}`, { responseType: 'blob' });
  }

  getAllPlayers(){
    return this.http.get<any>(`${this.backendUrl}/api/users/players`);
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
