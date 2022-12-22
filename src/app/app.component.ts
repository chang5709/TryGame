import { Component } from '@angular/core';
import { GameResult, PlayerType } from './@models/game.model';
import { GameApiService } from './@services/game-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'angularGame';
  playerType = PlayerType;
  gameResult = GameResult;
  playerTypeString = new Map<PlayerType, String>([[PlayerType.scissors, "剪刀"], [PlayerType.rock, "石頭"], [PlayerType.paper, "布"]]);
  gameResultString = new Map<GameResult, String>([[GameResult.Bot, "你輸了!"], [GameResult.Draw, "和局!"], [GameResult.Player, "你贏了!"]]);

  constructor(public gameApiService: GameApiService) { }

  //全勝敗紀錄
  get playerAllCount(){
    return this.gameApiService.WinMap
  }
  //機器人出的拳
  get lastBotType() {
    if (this.gameApiService.logList[0] == undefined)
      return "準備"
    else
      return this.playerTypeString.get(this.gameApiService.logList[0].botType)
  }
  //對戰結果顯示
  get lastGameResult() {
    if (this.gameApiService.logList[0] == undefined)
      return "你好!點擊上方按鈕選擇出拳"
    else {
      return this.gameResultString.get(this.gameApiService.logList[0].nowResult)
    }
  }
  //對戰紀錄
  get logList(): { nowResult: GameResult, playerType: PlayerType, botType: PlayerType }[] {
    return this.gameApiService.logList
  }
  play(userType: number) {
    this.gameApiService.start(userType);
  }


  Reset() {
    //重置按鈕
    this.gameApiService.CleanResultLog()
  }
}
