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


  Init(playerCount: number, botCount: number) {
    this.playerCount = playerCount
    this.botCount = botCount
    for (let index = 0; index < playerCount; index++) {
      this.players.push(new PlayerInfo("Player" + (index + 1)))
      this.getStorage()
    }
  }


  NewPart() {
    this.parts.unshift(new Part(this.playerCount, this.botCount))
    //限制對戰紀錄上限 5 個 + 不顯示的 1 個
    if (this.parts.length > 6)
      this.parts.pop();
  }


  PlayerType(playerNum: number, type: PlayerType) {
    this.parts[0].Add(this.players[playerNum], type)
    if (this.parts[0].winner.length > 0) {
      this.setInfoToStorage()
      this.NewPart()
    }
  }


  setInfoToStorage() {
    let logArray = []
    for (var i = 0; i < this.parts.length; i++) {
      logArray.push([...this.parts[i].list.entries()])
    }
    //logJSON = 每個part的list 取出拳紀錄用
    //winnerJSON = 取parts
    let AllStorage = {
      logJSON: logArray,
      winnerJSON: this.parts,
    }
    localStorage.setItem('AllStorage', JSON.stringify(AllStorage))
  }


  getStorage() {
    let logStorage = localStorage.getItem('AllStorage');
    if (logStorage != undefined) {
      let getStorage = JSON.parse(logStorage)
      this.parts = getStorage.winnerJSON
      for (var i = 0; i < this.parts.length; i++) {
        this.parts[i].list = new Map<PlayerInfo, PlayerType>(getStorage.logJSON[i])
      }

    }
  }
}
