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

  playerTypeString = new Map<PlayerType, String>([[PlayerType.scissors, "剪刀 "], [PlayerType.rock, "石頭 "], [PlayerType.paper, "布 "]])
  resultLog: string[] = []
  partWinner: string[] = []

  MakeLog() {
    let winName = ""
    if (this.parts.length > 1) {
      if (this.parts[1].winner.length == 0)
      winName = "和局"
      else {
        let temp = ''
        temp = "勝者為: "
        for (let i = 0; i < this.parts[1].winner.length; i++) {
          temp += this.parts[1].winner[i].name + " "
        }
        winName = temp
      }

      this.resultLog.unshift(
        "Bot1出" + this.playerTypeString.get(this.GetInfoByName("Bot1")!) +
        "Bot2出" + this.playerTypeString.get(this.GetInfoByName("Bot2")!) +
        "P1出" + this.playerTypeString.get(this.GetInfoByName("Player1")!) +
        "P2出" + this.playerTypeString.get(this.GetInfoByName("Player2")!) +
        winName
      )
      if(this.resultLog.length > 6){
        this.resultLog.pop()
      }
    }
  }


  GetInfoByName(name: string): PlayerType | undefined {
    for (let key of this.parts[1].list)
      if (name == key[0].name)
        return key[1]
    return undefined;
  }


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
    this.MakeLog()
    //限制對戰紀錄上限 5 個 + 不顯示的 1 個
    if (this.parts.length > 6) {
      this.parts.pop()
    }

  }


  PlayerType(playerNum: number, type: PlayerType) {
    this.parts[0].Add(this.players[playerNum], type)
    if (this.parts[0].isSettle) {
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
    localStorage.setItem('logStorage', JSON.stringify(AllStorage))
    localStorage.setItem('logStorage', JSON.stringify(AllStorage))
  }


  getStorage() {
    let logStorage = localStorage.getItem('logStorage');
    if (logStorage != undefined) {
      let getStorage = JSON.parse(logStorage)
      this.parts = getStorage.winnerJSON
      for (var i = 0; i < this.parts.length; i++) {
        this.parts[i].list = new Map<PlayerInfo, PlayerType>(getStorage.logJSON[i])
      }
    }
  }
}
