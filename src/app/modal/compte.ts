import { Client } from "./client";

export interface Compte {
  client:string
    id: number
    numero: string
    type: string
    solde: number
    creationDate:Date
    proprietaire: Client
    
    
}
