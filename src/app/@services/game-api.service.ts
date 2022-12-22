import { GameResult, PlayerType } from './../@models/game.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GameApiService {
  constructor() {
    this.getStorage();
  }
  logList:{nowResult:GameResult, playerType: PlayerType, botType: PlayerType}[]= []
  WinMap = new Map<GameResult, number>([[GameResult.Player, 0], [GameResult.Draw, 0], [GameResult.Bot, 0]])


  start(type: number) {
    let Type = [PlayerType.scissors, PlayerType.rock, PlayerType.paper]
    let botType = Type[Math.floor(Math.random() * 3)];
    let temp ={
      nowResult: GameResult.Bot,
      playerType: type,
      botType: botType
    }
    switch (type) {
      case botType:
        temp.nowResult = GameResult.Draw
        break;
      case PlayerType.scissors:
        if (botType == PlayerType.paper)
        temp.nowResult = GameResult.Player
        break;
      case PlayerType.rock:
        if (botType == PlayerType.scissors)
        temp.nowResult = GameResult.Player
        break;
      case PlayerType.paper:
        if (botType == PlayerType.rock)
        temp.nowResult = GameResult.Player
        break;
    }
    if (this.logList.length > 5) {
      //限制對戰紀錄5條
      this.logList.pop();
    }
    this.WinMap.set(temp.nowResult, this.WinMap.get(temp.nowResult)! + 1)
    this.logList.unshift(temp);
    this.setLogToStorage()
    this.setWinStorage()
  }


  CleanResultLog() {
    localStorage.clear();
    location.reload();
  }


  setLogToStorage(){
    let logJSON = JSON.stringify(this.logList);
    localStorage.setItem('logStorageString', logJSON);
  }


  setWinStorage() {
    let winLog = [...this.WinMap.entries()]
    let winJSON = JSON.stringify(winLog);
    localStorage.setItem('winStorageString', winJSON);
  }


  getStorage() {
    let logstorage = localStorage.getItem('logStorageString');
    if (logstorage != null) {
      var logStorageParse = JSON.parse(logstorage);
      this.logList = logStorageParse;
    }
    let winStorage = localStorage.getItem('winStorageString');
    if (winStorage != null) {
      let winStorageParse = JSON.parse(winStorage);
      this.WinMap = new Map<GameResult, number>(winStorageParse)
    }
  }
}
