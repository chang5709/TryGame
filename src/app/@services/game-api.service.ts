import { GameResult, PlayerType } from './../@models/game.model';
import { Injectable } from '@angular/core';
import { PartManager } from './PartManager.class';


@Injectable({
  providedIn: 'root'
})

export class GameApiService {
  //設定玩家及機器人人數
  protected playerCount = 2
  protected botCount = 2
  constructor(private partManager:PartManager) {
    this.partManager.Init(this.playerCount, this.botCount)
    this.partManager.NewPart()
  }
  logList:{nowResult:GameResult, playerType: PlayerType, botType: PlayerType}[]= []
  WinMap = new Map<GameResult, number>([[GameResult.Player, 0], [GameResult.Draw, 0], [GameResult.Bot, 0]])

  //玩家1出拳
  Play1(type: PlayerType){
    this.partManager.PlayerType(0,type)
  }

  //玩家2出拳
  Play2(type: PlayerType){
    this.partManager.PlayerType(1,type)
  }

  //重置按鈕
  CleanResultLog() {
    localStorage.clear();
    location.reload();
  }
}
