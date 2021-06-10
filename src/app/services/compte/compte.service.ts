import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compte } from 'src/app/modal/compte';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private backUrl = environment.backUrl;

  constructor(private http: HttpClient) { }

  public getCompte(id:string):Observable<Compte[]>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Compte[]>(`${this.backUrl}/client/${id}/comptes`,{headers});

  }

  public getAllCompte():Observable<Compte[]>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Compte[]>(`${this.backUrl}/comptes/all`,{headers});

  }

  public getAllCompteByProp(prop):Observable<Compte[]>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Compte[]>(`${this.backUrl}/compte/prop/${prop}`,{headers});

  }

  public addCompte(Compte:Compte):Observable<Compte>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Compte>(`${this.backUrl}/comptes`,Compte,{headers});

  }


  public updateCompte(id:number,Compte:Compte):Observable<Compte>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put<Compte>(`${this.backUrl}/compte/${id}`,Compte,{headers});

  }

  public updateCompteNew(Compte:Compte):Observable<Compte>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put<Compte>(`${this.backUrl}/compte/update`,Compte,{headers});

  }

  public deleteCompte(id:number):Observable<void>{
    let username = sessionStorage.getItem('username');
    let password = sessionStorage.getItem('password');
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete<void>(`${this.backUrl}/compte/${id}`,{headers});

  }
 
}
