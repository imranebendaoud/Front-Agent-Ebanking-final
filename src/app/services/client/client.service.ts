import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from 'src/app/modal/agent';
import { Appointment } from 'src/app/modal/appointment';
import { Client } from 'src/app/modal/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  AgentId:string=sessionStorage.getItem('currentAgentId')

  private backUrl = environment.backUrl;
  httpOptionsPlain = {
    headers: new HttpHeaders({
      'Accept': 'text/plain',
      'Content-Type': 'text/plain'
    }),
    'responseType': 'text'
  };

  constructor(private http: HttpClient) { 

  }

  public getClient(id:number):Observable<Client[]>{
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get<Client[]>(`${this.backUrl}/agence/${id}/clients`,{headers});

  }

  public findAgentByUsername(usernameClient:string):Observable<Agent>{
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Agent>(`${this.backUrl}/agent/username/${usernameClient}`,{headers});

  }

  public addClient(client:Client):Observable<Client>{
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Client>(`${this.backUrl}/clients`,client,{headers});

  }

  public updateClient(Client:Client):Observable<Client>{
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put<Client>(`${this.backUrl}/client/update`,Client,{headers});

  }

  public deleteClient(id:number):Observable<void>{
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete<void>(`${this.backUrl}/client/${id}`,{headers});

  }
  public findAgentAppointments(id: string): Observable<Appointment[]> {
   
    return this.http.get<Appointment[]>(`${this.backUrl}/agent/${id}/appointments`);
  }


 
}
