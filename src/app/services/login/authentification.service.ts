import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Agent } from 'src/app/modal/agent';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(private httpClient: HttpClient) { }

  authentificate(username, password) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

   // console.log(username+'dsfzdf'+password)
    return this.httpClient
      .get<Agent>('https://ebanking-app.herokuapp.com/agent/username/'+username, {headers})
      .pipe(
        map((userData) => {
          //console.log(userData)
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('currentAgentId', userData.id.toString());
          console.log("is logged"+this.isUserLoggedIn())
          return userData;
          
        })

      );

      
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    console.log("loggeed out")
  }
}
