import {Club} from "./Club";

export interface Championship{
  id: number,
  name: string,
  description: string,
  category: string,
  province: string,
  groupType: string,
  price: number,
  matchDay: number,
  clubs: Club[]
}
