import {Championship} from "./Championship";
import {Club} from "./Club";

export interface ChampionshipStat{
  id?: number
  championship: Championship
  club: Club
  points: number
  matches: number
  wins: number
  losses: number
  draws: number
  goalsScored: number
  goalsConceded: number
  goalsDifference: number
}
