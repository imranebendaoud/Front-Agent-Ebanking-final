import { Appointment } from "./appointment";

export interface Agent {
    id: number;
  nom: string;
  prenom: string;
  cin: string;
  adresse: string;
  telephone: string;
  email: string;
  username: string;
  password: string;
  appointment:Appointment
}
