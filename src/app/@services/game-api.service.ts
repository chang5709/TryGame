import { GameResult, PlayerType } from './../@models/game.model';
import { Injectable } from '@angular/core';
import { PartManager } from './PartManager.class';
import { PlayerInfo } from '../PlayerInfo.class';


@Injectable({
  providedIn: 'root'
})

export class GameApiService {
  //設定玩家人數
  protected playerCount = 2
  //設定機器人數
  protected botCount = 2


  constructor(private partManager:PartManager) {

    this.partManager.Init(this.playerCount, this.botCount)
    this.partManager.NewPart()

    //this.getStorage();

  }


  logList:{nowResult:GameResult, playerType: PlayerType, botType: PlayerType}[]= []
  WinMap = new Map<GameResult, number>([[GameResult.Player, 0], [GameResult.Draw, 0], [GameResult.Bot, 0]])

  Play1(type: PlayerType){
    this.partManager.PlayerType(0,type)
  }


  Play2(type: PlayerType){
    this.partManager.PlayerType(1,type)
  }


  CleanResultLog() {
    localStorage.clear();
    location.reload();
  }


  // setLogToStorage(){
  //   let logJSON = JSON.stringify(this.logList);
  //   localStorage.setItem('logStorageString', logJSON);
  // }


  // setWinStorage() {
  //   let winLog = [...this.WinMap.entries()]
  //   let winJSON = JSON.stringify(winLog);
  //   localStorage.setItem('winStorageString', winJSON);
  // }


  getStorage() {
    let logStorage = localStorage.getItem('logStorageString');
    if (logStorage != null) {





      var logStorageParse = JSON.parse(logStorage);
      this.logList = logStorageParse;
    }
    let winStorage = localStorage.getItem('winStorageString');
    if (winStorage != null) {
      let winStorageParse = JSON.parse(winStorage);
      this.WinMap = new Map<GameResult, number>(winStorageParse)
    }
  }
}
