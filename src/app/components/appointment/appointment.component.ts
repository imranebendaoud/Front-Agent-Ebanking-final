import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Appointment } from 'src/app/modal/appointment';
import { Client } from 'src/app/modal/client';
import { AppointmentsService } from 'src/app/services/appointment/appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  appointments : Appointment[]=[];
  editAppointment :Appointment;
  deleteAppointment :Appointment;

  client:Client

  constructor(private appointmentService:AppointmentsService) { }

  ngOnInit(): void {
    this.getAppointments()
  }
  getAppointments(){
    this.appointmentService.GetAllAppointments().subscribe(
      (response:Appointment[]) => { 
        
        this.appointments = response;
        console.log(response)
        
      },
      (error:HttpErrorResponse) => {
        console.log(error.message)
        

      }
    );
  }

  public onOpenModal(appointment: Appointment, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
   
    if (mode === 'edit') {
      this.editAppointment = appointment
      button.setAttribute('data-target', '#updateModal');
    }
    if (mode === 'delete') {
      this.deleteAppointment = appointment
      button.setAttribute('data-target', '#deleteModal');
    }
    
    container.appendChild(button);
    button.click();
  }
  public onUpdateAppointment(appointment: any): void{
    this.client=this.editAppointment.client
    appointment.client=this.client
    this.appointmentService.updateAppointment(appointment).subscribe(
      (response:Appointment)=> {
        console.log("response edit :" +response)
        this.getAppointments();
      },
      (error :HttpErrorResponse) => {
        alert(error.message)
        console.log(error)
      }
    )
  }

  public onDeleteAppointment(id:number): void{
    id=this.deleteAppointment.id
    this.appointmentService.deleteAppointment(id).subscribe(
      (response:any)=> {
        console.log("response edit :" +response)
        this.getAppointments();
      },
      (error :HttpErrorResponse) => {
        alert(error.message)
        console.log(error)
      }
    )
  }
}