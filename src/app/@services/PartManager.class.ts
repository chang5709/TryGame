import { Injectable } from "@angular/core";
import { PlayerType } from "../@models/game.model";
import { PlayerInfo } from "../PlayerInfo.class";
import { Part } from "./Part.class";

@Injectable({
  providedIn: 'root'
})

export class PartManager {

  public players: PlayerInfo[] = []
  public parts: Part[] = []
  private playerCount: number = 0
  private botCount: number = 0
  private _result:string[] = []
  playerTypeString = new Map<PlayerType, String>([[PlayerType.scissors, "剪刀 "], [PlayerType.rock, "石頭 "], [PlayerType.paper, "布 "]])

  get nowPart(){
    return this.parts[0]
  }

  get resultLog2(){
    return this._result
  }

  set resultLog2(log:string[]){
    this._result = log
  }

  MakeLog() {
    let winName:string = ""
      if (this.nowPart.winner.length == 0)
      winName = "和局"
      else {
        winName = "勝者為: "
        this.nowPart.winner.forEach(item => {
          winName += item.name + " "
        })
      }
      this._result.unshift(
        "Bot1出" + this.playerTypeString.get(this.GetTypeByName("Bot1")!) +
        "Bot2出" + this.playerTypeString.get(this.GetTypeByName("Bot2")!) +
        "P1出" + this.playerTypeString.get(this.GetTypeByName("Player1")!) +
        "P2出" + this.playerTypeString.get(this.GetTypeByName("Player2")!) +
        winName
      )
      if(this.resultLog2.length > 5)
        this.resultLog2.pop()
  }


  GetTypeByName(name: string): PlayerType | undefined {
    for (let key of this.nowPart.list)
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
    if (this.parts.length > 2) {
      this.parts.pop()
    }
  }


  PlayerType(playerNum: number, type: PlayerType) {
    this.nowPart.Add(this.players[playerNum], type)
    if (this.nowPart.isSettle) {
      this.MakeLog()
      this.NewPart()
      this.setInfoToStorage()
    }
  }


  setInfoToStorage() {
    localStorage.setItem('logStorage', JSON.stringify(this._result))
  }


  getStorage() {
    let logStorage = localStorage.getItem('logStorage');
    if (logStorage != undefined) {
      let getStorage = JSON.parse(logStorage)
      this._result = getStorage
    }
  }
}
