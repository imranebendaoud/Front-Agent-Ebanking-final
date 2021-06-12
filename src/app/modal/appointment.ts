import { Client } from "./client";

export interface Appointment {
    id:number
    client:Client
    motif:String
    status:String
    dateRdv:Date
    dateDemande:Date

}
