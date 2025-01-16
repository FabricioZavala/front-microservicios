import { Equipment } from "./equipment.interface";

export interface User {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
  status: string;
  equipmentIds?: string[];
  equipments?: Equipment[];
  roles?: string[];
  equipmentNames?: string;
}
