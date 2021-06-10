import { Agent } from "./agent";
import { Compte } from "./compte";


export interface Client {
    id: number;
    adresse: string;
    cin: string;
    email: string;
    nom: string;
    password: string;
    prenom: string;
    role: string;
    telephone: string;
    username: string;
    compte:Compte;
    agent:Agent;
   
    
}




