import {User} from "./User";

export interface Player extends User{
  gender: string;
  position: string;
  biography: string;
  available: string;
  photo?: string
}
