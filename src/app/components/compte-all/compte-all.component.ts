import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/modal/client';
import { Compte } from 'src/app/modal/compte';
import { CompteService } from 'src/app/services/compte/compte.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-compte-all',
  templateUrl: './compte-all.component.html',
  styleUrls: ['./compte-all.component.scss']
})
export class CompteAllComponent implements OnInit {

  settings = {

    pager: {
      display: true,
      perPage: 12,
    },
    actions: {
      add: false,
     
      },
    add: {
      createButtonContent: '<i class="fa fa-plus-circle" aria-hidden="true"></i>',
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
        title: 'Account Number',
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
        addable: false
      },
      proprietaire:{
        
        title: 'Account owner',
        valuePrepareFunction: (value: any,row:any,cell:any) => {
            value = cell.newValue.nom
            return value
        },
        editable:false,
        addable: false
      }

    }
  };
  
  prop:Client[]=[];
  comptesAll:Compte[]=[];
  comptesAllNew:Compte[]=[];

  idCompte: any;

  loading$ = this.loader.loading$;


  constructor(private router:Router,private compteService:CompteService, public loader:LoadingService) {  
    this.idCompte=this.router.getCurrentNavigation()?.extras.state;

  }

  ngOnInit(): void {
    this.getAllComptes();
  }


  getAllComptes(){
    this.compteService.getAllCompte().subscribe(
      (response:Compte[]) => { 
        this.comptesAll = response;
        this.selectCompte = response;
        console.log(response)
        var result = this.comptesAll.reduce((unique, o) => {
          if(!unique.some(obj => obj.proprietaire.nom === o.proprietaire.nom)) {
            unique.push(o);
          }
          return unique;
      },[]);
      console.log('resss')
      console.log(result);
      this.comptesAll = result;
      },
      (error:HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }
  
  selectCompte:Compte[]=[];

  onChange(event){
    if(event==='All'){
      this.getAllComptes();
    }
    else{
    console.log(event)
    this.compteService.getAllCompteByProp(event).subscribe(
      (response:Compte[]) => {
        
        this.selectCompte = response;
        console.log(response)
      },
      (error:HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }}
  alert=false
  alertSolde=false
  onUpdateCompte(event: { newData: Compte; }) {
    if(event.newData.solde.toString()===""||event.newData.type===""){
      this.alert=true
    }
    else if(confirm('Voulez vous editer ce compte')){
      if(this.validateNumber(event.newData.solde)===false){
        this.alertSolde=true
      }
      else{
      this.compteService.updateCompteNew(event.newData).subscribe(
        res => {
          this.getAllComptes();
          console.log('updaaate')
        console.log(event); 
        this.alertSolde=false
        this.alert=false
        
       }, 
       (error:HttpErrorResponse) => {
        console.log(error);
        
        });
    }}
    
  
  }
  validateNumber(number) {
    const re = /^[0-9\b]+$/;
    return re.test(String(number));
  }

  onDeleteCompte(event: { data: { id: number;proprietaire;numero:string; }; }) {
    console.log(event)
    if(confirm('Voulez vous supprimer le compte Numero '+event.data.numero+' du client : '+event.data.proprietaire.nom+' '+event.data.proprietaire.prenom  )){

    this.compteService.deleteCompte(event.data.id).subscribe(
      res => {
      console.log(res); 
      this.getAllComptes();
     }, 
     (error:HttpErrorResponse) => {
      console.log(error);
      
      });
    }
  }

}
