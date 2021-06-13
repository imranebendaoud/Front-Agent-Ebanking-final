import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compte } from 'src/app/modal/compte';
import { CompteService } from 'src/app/services/compte/compte.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  settings = {
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
    attr: {
      class: 'table'
    },
    columns: {
      id: {
        title: 'ID',
        editable:false,
        addable: false,
        sortDirection:'desc'

      },
      numero: {
        title: 'Account number',
        editable:false,
        addable: false
      },
      solde: {
        title: 'Balance',
        valuePrepareFunction: (value) => { return value === 'Solde'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'MAD'}).format(value)}

      },
      type: {
        title: 'Type'
      },
      creationDate:{
        title:'Creation date time',
        editable:false,
        addable: false,
      }

    }
  };
  
  comptes:Compte[]=[];
  idCompte: any;

  loading$ = this.loader.loading$;

  constructor(private router:Router,private compteService:CompteService, public loader:LoadingService) {  
      // console.log(this.router.getCurrentNavigation()?.extras.state);
      this.idCompte=this.router.getCurrentNavigation()?.extras.state;

      
  }

  ngOnInit(): void {
    //this.idCompte=this.router.getCurrentNavigation()?.extras.state;
    sessionStorage.setItem('compte',this.idCompte.id)
    console.log(this.idCompte);
    this.getComptes();
  }


  getComptes(){
    this.compteService.getCompte(sessionStorage.getItem('compte')).subscribe(
      (response:Compte[]) => { 
        this.comptes = response;
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        console.log(error)
        if(error.error.status === 404){
          this.comptes = [];

        }
      }
    );
  }

  alert=false
  alertSolde=false
  onAddCompte(event: { newData: Compte; }) {
    Swal.fire({
      title: 'Do you want to add this account ?',
     
      showCancelButton: true,
      confirmButtonText: 'Yes',
    
     
    }).then((valeur)=>{
      if(valeur.isConfirmed){

       if(event.newData.solde.toString()===""||event.newData.type===""){
        this.alert=true
      }
    else if(this.validateNumber(event.newData.solde)===false){
      this.alertSolde=true
    }
    else{

    console.log(event)
    event.newData.proprietaire=this.idCompte;
    this.compteService.addCompte(event.newData).subscribe(
      res => {
      this.getComptes();
      console.log(event)
      this.alert=false
      this.alertSolde=false

     }, 
     (error:HttpErrorResponse) => {
      console.log(error);
      
      });
  }}})}

  validateNumber(number) {
    const re = /^[0-9\b]+$/;
    return re.test(String(number));
  }

  onUpdateCompte(event: { newData: Compte; }) {
    Swal.fire({
      title: 'Do you want to edit this account !!',
     
      showCancelButton: true,
      confirmButtonText: 'Yes',
    
     
    }).then((valeur)=>{
      if(valeur.isConfirmed){
    if(event.newData.solde.toString()===""||event.newData.type===""){
      this.alert=true
    }
    else if(this.validateNumber(event.newData.solde)===false){
      this.alertSolde=true
    }
    else{

      this.compteService.updateCompteNew(event.newData).subscribe(
        res => {
          this.getComptes();
          console.log('updaaate')
        console.log(event); 
        this.alert=false
        this.alertSolde=false
        
       }, 
       (error:HttpErrorResponse) => {
        console.log(error);
        
        });

    } }
    
  
  })}



  onDeleteCompte(event: { data: { id: number;proprietaire:string;numero:string; }; }) {
    console.log(event)
    Swal.fire({
      title: 'Do you want to delete number '+event.data.numero+' account of '+this.idCompte.nom+' '+this.idCompte.prenom+' client',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('ok')
        this.compteService.deleteCompte(event.data.id).subscribe(
          res => {
            this.getComptes();
          console.log(res); 
         }, 
         (error:HttpErrorResponse) => {
          console.log(error);
          
          });
        Swal.fire(
          'Deleted!',
          'Your account has been deleted.',
          'success'
        )
      }
    })
   
  }

}
