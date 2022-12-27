import { PartManager } from './@services/PartManager.class';
import { Component } from '@angular/core';
import { GameResult, PlayerType } from './@models/game.model';
import { GameApiService } from './@services/game-api.service';
import { PlayerInfo } from './PlayerInfo.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  PlayerType = PlayerType;
  gameResult = GameResult;
  playerTypeString = new Map<PlayerType, String>([[PlayerType.scissors, "剪刀"], [PlayerType.rock, "石頭"], [PlayerType.paper, "布"]]);
  gameResultString = new Map<GameResult, String>([[GameResult.Bot, "你輸了!"], [GameResult.Draw, "和局!"], [GameResult.Player, "你贏了!"]]);

  constructor(public gameApiService: GameApiService, private partManager: PartManager) { }

  //玩家1結算畫面
  get playerResult() {
    if (this.partManager.parts.length <= 1)
      return { gameResult: GameResult.Draw, resultString: "你好!點擊上方按鈕選擇出拳" }
    else {
      if (this.partManager.parts[1].winner.length == this.partManager.parts[1].totalPlayers)
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
      if (this.partManager.parts[1].winner.length == this.partManager.parts[1].totalPlayers)
        return { gameResult: GameResult.Draw, resultString: "和局" }
      else if (this.partManager.parts[1].winner.some(e => e.name == 'Player2'))
        return { gameResult: GameResult.Player, resultString: "P2贏了!" }
      else
        return { gameResult: GameResult.Bot, resultString: "P2輸了!" }
    }
  }
  //Bot1出的拳
  get lastBotPlayerType() {
    if (this.partManager.parts.length <= 1)
      return "Bot1"
    else
      return this.playerTypeString.get(this.partManager.parts[1].list.get(this.GetInfoByName(this.partManager.parts[1].list,"Bot1"))!)
  }
  //Bot2出的拳
  get lastBotPlayerType2() {
    if (this.partManager.parts.length <= 1)
      return "Bot2"
    else
      return this.playerTypeString.get(this.partManager.parts[1].list.get(this.GetInfoByName(this.partManager.parts[1].list,"Bot2"))!)
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
    return this.partManager.parts.slice(1, this.partManager.parts.length)
  }

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

  //畫面從list取value
  GetInfoByName(map:Map<any,any>,name: string){
    let info!:PlayerInfo
    map.forEach((value, key)=>{
      if(name == key.name)
        info = key
    })
    return info
  }
}
