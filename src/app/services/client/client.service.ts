import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/modal/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
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

  public getClient():Observable<Client[]>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get<Client[]>(`${this.backUrl}/clients`,{headers});

  }

 

  public addClient(client:Client):Observable<Client>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Client>(`${this.backUrl}/clients`,client,{headers});

  }

  public updateClient(Client:Client):Observable<Client>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put<Client>(`${this.backUrl}/client/update`,Client,{headers});

  }

  public deleteClient(id:number):Observable<void>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete<void>(`${this.backUrl}/client/${id}`,{headers});

  }

 
}
