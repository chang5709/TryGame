import { Injectable } from "@angular/core";
import { PlayerType } from "../@models/game.model";
import { PlayerInfo } from "../PlayerInfo.class";
import { Part } from "./Part.class";

@Injectable({
  providedIn: 'root'
})

export class PartManager {

  players: PlayerInfo[] = []
  parts: Part[] = []
  playerCount: number = 0
  botCount: number = 0

  constructor() {

  }

  get nowPart() {
    return this.parts[0]
  }


  Init(playerCount: number, botCount: number) {
    this.playerCount = playerCount
    this.botCount = botCount
    for (let index = 0; index < playerCount; index++) {
      this.players.push(new PlayerInfo("Player" + (index + 1)))

    }
  }


  NewPart() {
    this.parts.unshift(new Part(this.playerCount, this.botCount))
    //限制對戰紀錄上限 5 個 + 不顯示的 1 個
    if (this.parts.length > 6)
    this.parts.pop();
  }

  get nowWinner(){
    return this.parts[0].winner.length
  }


  PlayerType(playernum: number, type: PlayerType) {
    this.nowPart.Add(this.players[playernum], type)
    if(this.parts[0].winner.length > 0){
      //storage()
      this.NewPart()
    }
  }


}
