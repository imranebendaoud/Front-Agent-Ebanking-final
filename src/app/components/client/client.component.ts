import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/modal/client';
import { ClientService } from 'src/app/services/client/client.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients:Client[]=[];
  a: number = 2;

  settings = {
    columns: {
      id: {
        title: 'Id',
        editable:false,
        addable:false,
        sortDirection:'desc'
      },
      nom: {
        title: 'lastname'
      },
      prenom: {
        title: 'firstname'
      },
      email: {
        title: 'email'
      },
      telephone: {
        title: 'phone'
      },
      adresse: {
        title: 'address'
      },
      cin: {
        title: 'cin'
      },  
      username: {
        title: 'username'
      },
      password:{
        title:'password',
        filter:false,
        valuePrepareFunction: (value) => {  value === '****' }
      }

    },
    pager: {
      display: true,
      perPage: 12,
    },
    add: {
      createButtonContent: '<i class="fa fa-save" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle" aria-hidden="true"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="far fa-edit" aria-hidden="true"></i>',
      saveButtonContent: '<i class="fa fa-save" aria-hidden="true"></i>',
      cancelButtonContent: '<i class="fa fa-times-circle" aria-hidden="true"></i>',
      confirmSave: true,
      
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true"></i>',
      confirmDelete: true
    },
    actions: {
      columnTitle: 'Actions',

      custom: [
        {
          name: 'Add Account',
          title: 'Add <i class="fas fa-credit-card"></i><br>'
          
        }
       
      ],
      
    },
    attr: {
      class: 'table'
    },

  };


  loading$ = this.loader.loading$;

  constructor(private clientService:ClientService, private router:Router, public loader:LoadingService) {

   }

  ngOnInit(): void {
   // localStorage.removeItem('compte')
    this.getClients();
  }

  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }

    validateNumber(number) {
    const re = /^[0-9\b]+$/;
    return re.test(String(number));
  }

  
  getClients(){
    this.clientService.getClient().subscribe(
      (response:Client[]) => { 
        
        this.clients = response;
        console.log(response)
        console.log('dfzedfvzefzef')
      },
      (error:HttpErrorResponse) => {
        console.log(error.message)
        if(error.error.status === 404){
          this.clients = [];

        }

      }
    );
  }
  alert=false;
  alertEmail=false;
  alertTele=false;
  alertTeleEmail=false;
  onAddClient(event: { newData: Client; }) {
    console.log(event)
    Swal.fire({
      title: 'Do you want to add this client ?',
     
      showCancelButton: true,
      confirmButtonText: 'Yes',
    
     
    }).then((valeur)=>{
      if(valeur.isConfirmed){

      
      if(event.newData.adresse===""||event.newData.cin===""||event.newData.email===""||event.newData.nom===""||event.newData.password===""||event.newData.prenom===""||event.newData.telephone===""||event.newData.username===""){
        this.alert = true;
      }
      else if(this.validateEmail(event.newData.email)===false){
        this.alertEmail=true;
      }
      else if(this.validateNumber(event.newData.telephone)===false){
        this.alertTele=true;
      }
      else if(this.validateNumber(event.newData.telephone)===false && this.validateNumber(event.newData.telephone)===false){
        this.alertTeleEmail=true
      }
      else{
        this.clientService.addClient(event.newData).subscribe(
          res => {
    
          this.getClients();
          console.log(event)
          this.alert = false;
          this.alertEmail=false;
          this.alertTele=false;
          this.alertTeleEmail=false
         }, 
         (errorr:HttpErrorResponse) => {
          console.log(errorr);
          console.log(errorr.error.error)
  
          if(errorr.error.status === 409){
            Swal.fire("Existing client error !!", "error !!", "error");
           // alert('Conflict client déjà existant !!')
  
          }
          });
  
      }}
    })
    // if(confirm('voulez vous ajouter ce client ?')){
    // }
    
    
    
  }

  onUpdateClient(event: { newData: Client; }) {
   
    Swal.fire({
      title: 'Do you want to edit the client: '+event.newData.nom+' '+event.newData.prenom,
     
      showCancelButton: true,
      confirmButtonText: 'Yes',
    
     
    }).then((valeur)=>{
      if(valeur.isConfirmed){
        if(event.newData.adresse===""||event.newData.cin===""||event.newData.email===""||event.newData.nom===""||event.newData.password===""||event.newData.prenom===""||event.newData.telephone===""||event.newData.username===""){
          this.alert = true;
        }
        else if(this.validateEmail(event.newData.email)===false){
          this.alertEmail=true;
        }
        else if(this.validateNumber(event.newData.telephone)===false){
          this.alertTele=true
        }
        else{
          this.clientService.updateClient(event.newData).subscribe(
            res => {
            console.log(res); 
            this.getClients();
            this.alert = false;
            this.alertEmail=false
            this.alertTele=false
           }, 
           (error:HttpErrorResponse) => {
            console.log(error);
            
            });
        }
    
    
    }
  
  
  })}

  onDeleteClient(event: { data: { id: number;nom:string;prenom:string }; }) {
    Swal.fire({
      title: 'Do you want to delete the client: '+event.data.nom+' '+event.data.prenom+' ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('ok')
        this.clientService.deleteClient(event.data.id).subscribe(
          res => {
          console.log(res); 
          this.getClients();
         }, 
         (error:HttpErrorResponse) => {
          console.log(error);
          
          });
        Swal.fire(
          'Deleted!',
          'Your client has been deleted.',
          'success'
        )
      }
    })
    
  }
  
  onUserRowSelect(event: any): void {
    console.log(event);
    console.log('row selected: '+event.data.id);
    this.router.navigate(['/compte'],{ state: event.data });
    
}

onCustomAction(event:any):void{
  console.log(event);
  console.log('row selected: '+event.data.id);
  this.router.navigate(['/compte'],{ state: event.data });
  sessionStorage.setItem('compte',event.data.id)
  sessionStorage.setItem('compteNom',event.data.nom)
  sessionStorage.setItem('comptePrenom',event.data.prenom)


}

}
