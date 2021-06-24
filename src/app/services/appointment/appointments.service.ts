import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/modal/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  appointment:Appointment 
  
  constructor(private http: HttpClient) {
   }

  public GetAllAppointments(): Observable<Appointment[]> {
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Appointment[]>('https://ebanking-app.herokuapp.com/appointments',{headers});

  }
  public updateAppointment(appointment:Appointment):Observable<Appointment>{
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put<Appointment>((`https://ebanking-app.herokuapp.com/appointment/${appointment.id}`),appointment,{headers});

  }
  public deleteAppointment(id:number):Observable<void>{
    let username = sessionStorage.getItem('username');
    let password = atob(sessionStorage.getItem('password'));
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete<void>(`https://ebanking-app.herokuapp.com/appointment/${id}`,{headers});

  }
}
