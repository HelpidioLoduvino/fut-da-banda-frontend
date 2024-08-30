import {Club} from "./Club";

export interface Championship{
  id: number
  name: string
  description: string
  category: string
  province: string
  type: string
  price: number
  matchDay: number
  pricePer: string
  rule: string
  gender: string
  expiryDate: string
  startDate: string
  manualRule?: string
  clubs: Club[]
}
