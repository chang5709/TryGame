import { Component } from '@angular/core';
import { GameResult, PlayerType } from './@models/game.model';
import { GameApiService } from './@services/game-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  PlayerType = PlayerType;
  gameResult = GameResult;
  playerTypeString = new Map<PlayerType, String>([[PlayerType.scissors, "剪刀"], [PlayerType.rock, "石頭"], [PlayerType.paper, "布"]]);

  constructor(public gameApiService: GameApiService) {}

  //玩家1結算畫面
  get playerResult() {
    return this.gameApiService.playerResult
  }
  //玩家2結算畫面
  get playerResult2() {
    return this.gameApiService.playerResult2
  }
  //Bot1出的拳
  get lastBotPlayerType() {
    if (this.gameApiService.lastBotPlayerType == undefined)
      return "Bot1"
    else
      return this.playerTypeString.get(this.gameApiService.lastBotPlayerType)
  }
  //Bot2出的拳
  get lastBotPlayerType2() {
    if (this.gameApiService.lastBotPlayerType2 == undefined)
      return "Bot2"
    else
      return this.playerTypeString.get(this.gameApiService.lastBotPlayerType2)
  }
  //玩家1資訊
  get Player1() {
    return this.gameApiService.Player1
  }
  //玩家2資訊
  get Player2() {
    return this.gameApiService.Player2
  }
  //對戰紀錄
  get resultHistory() {
    return this.gameApiService.resultHistory.slice(1, this.gameApiService.resultHistory.length)
  }
  get resultHistory2(){
    return this.gameApiService.resultHistory2
  }
  // get winName(){
  //   return this.gameApiService.winName
  // }

  //玩家1出拳按鈕
  Play1(type: PlayerType) {
    this.gameApiService.Play1(type);
  }

  //玩家2出拳按鈕
  Play2(type: PlayerType) {
    this.gameApiService.Play2(type);
  }

  //重置按鈕
  Reset() {
    this.gameApiService.CleanResultLog()
  }
}
