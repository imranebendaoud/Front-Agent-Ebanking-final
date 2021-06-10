import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compte } from 'src/app/modal/compte';
import { CompteService } from 'src/app/services/compte/compte.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

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
   
    console.log(this.idCompte);
    this.getComptes();

  }


  getComptes(){
    this.compteService.getCompte(this.idCompte.id).subscribe(
      (response:Compte[]) => { 
        this.comptes = response;
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

  alert=false
  alertSolde=false
  onAddCompte(event: { newData: Compte; }) {
    if(confirm('voulez vous ajouter ce compte ?')){

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
  }}}

  validateNumber(number) {
    const re = /^[0-9\b]+$/;
    return re.test(String(number));
  }

  onUpdateCompte(event: { newData: Compte; }) {
    if(event.newData.solde.toString()===""||event.newData.type===""){
      this.alert=true
    }
    else if(this.validateNumber(event.newData.solde)===false){
      this.alertSolde=true
    }
    else{

    if(confirm('Voulez vous editer ce compte')){
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
    
  
  }



  onDeleteCompte(event: { data: { id: number;proprietaire:string;numero:string; }; }) {
    console.log(event)
    if(confirm('Voulez vous supprimer le compte Numero '+event.data.numero+' du client : '+this.idCompte.nom+' '+this.idCompte.prenom )){

    this.compteService.deleteCompte(event.data.id).subscribe(
      res => {
        this.getComptes();
      console.log(res); 
     }, 
     (error:HttpErrorResponse) => {
      console.log(error);
      
      });
    }
  }

}
