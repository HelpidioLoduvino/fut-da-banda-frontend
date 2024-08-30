import {Player} from "./Player";
import {Game} from "./Game";


export interface PlayerStat{
  id: number
  game: Game
  player: Player
  goals: number
  fouls: number
  assists: number
  yellowCards: number
  redCards: number
  blueCards: number
}
