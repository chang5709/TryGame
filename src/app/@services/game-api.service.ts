import { GameResult, PlayerType } from './../@models/game.model';
import { Injectable } from '@angular/core';
import { PartManager } from './PartManager.class';
import { PlayerInfo } from '../PlayerInfo.class';


@Injectable({
  providedIn: 'root'
})

export class GameApiService {
  //設定玩家及機器人人數
  protected playerCount = 2
  protected botCount = 2
  constructor(private partManager: PartManager) {
    this.partManager.Init(this.playerCount, this.botCount)
    this.partManager.NewPart()
  }

  get playerResult() {
    if (this.partManager.parts.length <= 1)
      return { gameResult: GameResult.Draw, resultString: "你好!點擊上方按鈕選擇出拳" }
    else {
      if (this.partManager.parts[1].winner.length == 0)
        return { gameResult: GameResult.Draw, resultString: "和局" }
      else if (this.partManager.parts[1].winner.some(e => e.name == 'Player1'))
        return { gameResult: GameResult.Player, resultString: "P1贏了!" }
      else
        return { gameResult: GameResult.Bot, resultString: "P1輸了!" }
    }
  }
  //玩家2結算畫面
  get playerResult2() {
    if (this.partManager.parts.length <= 1)
      return { gameResult: GameResult.Draw, resultString: "你好!點擊上方按鈕選擇出拳" }
    else {
      if (this.partManager.parts[1].winner.length == 0)
        return { gameResult: GameResult.Draw, resultString: "和局" }
      else if (this.partManager.parts[1].winner.some(e => e.name == 'Player2'))
        return { gameResult: GameResult.Player, resultString: "P2贏了!" }
      else
        return { gameResult: GameResult.Bot, resultString: "P2輸了!" }
    }
  }

  //Bot1出的拳
  get lastBotPlayerType() {
    if (this.partManager.parts.length > 1)
      return this.GetInfoByName(this.partManager.parts[1].list, "Bot1")
    else
      return undefined
  }
  //Bot2出的拳
  get lastBotPlayerType2() {
    if (this.partManager.parts.length > 1)
      return this.GetInfoByName(this.partManager.parts[1].list, "Bot2")
    else
      return undefined
  }
  //玩家1資訊
  get Player1() {
    return this.partManager.players[0]
  }
  //玩家2資訊
  get Player2() {
    return this.partManager.players[1]
  }
  //對戰紀錄
  get resultHistory() {
    return this.partManager.parts
  }
  get resultHistory2(){
    return this.partManager.resultLog
  }
  // get winName(){
  //   return this.partManager.partWinner
  // }

  //畫面從list取value
  GetInfoByName(map: Map<PlayerInfo, PlayerType>, name: string): PlayerType | undefined {
    for (let key of map)
      if (name == key[0].name)
        return key[1]
    return undefined;
  }

  //玩家1出拳
  Play1(type: PlayerType) {
    this.partManager.PlayerType(0, type)
  }

  //玩家2出拳
  Play2(type: PlayerType) {
    this.partManager.PlayerType(1, type)
  }

  //重置按鈕
  CleanResultLog() {
    localStorage.clear();
    location.reload();
  }

}
