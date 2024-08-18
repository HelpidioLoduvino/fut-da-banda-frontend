import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  private backendUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  invitePlayer(id: number){
    const params = new HttpParams().set('playerId', id.toString())
    return this.http.post(`${this.backendUrl}/api/invitations/invite`, null, {params, observe: "response"})
  }

  joinClub(id: number){
    const params = new HttpParams().set('clubId', id.toString())
    return this.http.post(`${this.backendUrl}/api/invitations/join`, null, {params, observe: "response"})
  }

  getAllCaptainInvitationByUserId(){
    return this.http.get<any>(`${this.backendUrl}/api/invitations/captain`, {observe: "response"})
  }

  getAllPlayerInvitationByUserId(){
    return this.http.get<any>(`${this.backendUrl}/api/invitations/player`, {observe: "response"})
  }

  countUnseen(){
    return this.http.get<any>(`${this.backendUrl}/api/invitations/unseen`, {observe: "response"})
  }

  getAllSenderInvitationByUserId(){
    return this.http.get<any>(`${this.backendUrl}/api/invitations/sender`, {observe: "response"})
  }

  acceptInvitation(id: number){
    const params = new HttpParams().set('invitationId', id.toString())
    return this.http.put(`${this.backendUrl}/api/invitations/accept-invitation`, null, {params, observe: "response"})
  }

  acceptPlayerPermission(id: number){
    const params = new HttpParams().set('invitationId', id.toString())
    return this.http.put(`${this.backendUrl}/api/invitations/accept-player`, null, {params, observe: "response"})
  }

  rejectInvitation(id: number){
    const params = new HttpParams().set('invitationId', id.toString())
    return this.http.put(`${this.backendUrl}/api/invitations/reject-invitation`, null, {params, observe: "response"})
  }

  rejectPlayerPermission(id: number){
    const params = new HttpParams().set('invitationId', id.toString())
    return this.http.put(`${this.backendUrl}/api/invitations/reject-player`, null, {params, observe: "response"})
  }

  clubAlreadyInvitedPlayer(){
    return this.http.get<any>(`${this.backendUrl}/api/invitations/club`, {observe: "response"})
  }

  listPlayerPermission(){
    return this.http.get<any>(`${this.backendUrl}/api/invitations/permissions`, {observe: "response"})
  }


}
