import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/modal/appointment';
import { AppointmentsService } from 'src/app/services/appointment/appointments.service';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  appointments : Appointment[]=[];
  editAppointment :Appointment;
  deleteAppointment :Appointment;
  agentId:string=sessionStorage.getItem('currentAgentId')

  constructor(private appointmentService:AppointmentsService,private clientService:ClientService) { }

  ngOnInit(): void {
    this.getAppointments()
  }

  getAppointments(){
    this.clientService.findAgentAppointments(this.agentId).subscribe(
      (response : Appointment[])=>{
        this.appointments=response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        console.log(error.message);
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
    appointment.client=this.editAppointment.client
    appointment.agent=this.editAppointment.agent

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