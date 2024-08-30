import {Championship} from "./Championship";
import {Field} from "./Field";
import {Club} from "./Club";

export interface Game{
  id?: number
  championship: Championship
  field: Field
  firstClub: Club
  secondClub: Club
  matchDay: number
  dateTime: string
  status?: string
}
