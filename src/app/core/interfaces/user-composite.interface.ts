// src/app/models/user-composite.model.ts

import { Equipment } from "./equipment.interface";
import { User } from "./user.interface";


export interface IUserComposite extends User {
  equipments?: Equipment[];
}
