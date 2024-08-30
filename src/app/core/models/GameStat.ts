import {Game} from "./Game";
import {Player} from "./Player";
import {Club} from "./Club";

export interface GameStat{
  id: number
  game: Game
  club: Club
  goals: number
  fouls: number
  corners: number
  yellowCards: number
  redCards: number
  blueCards: number
}
