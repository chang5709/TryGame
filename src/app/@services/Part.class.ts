import { PlayerType } from './../@models/game.model';
import { PlayerInfo } from './../PlayerInfo.class';

export class Part {
  public totalPlayers: number = 0;
  private static random = [PlayerType.scissors, PlayerType.rock, PlayerType.paper]
  public list: Map<PlayerInfo, PlayerType> = new Map<PlayerInfo, PlayerType>();
  public winner: PlayerInfo[] = []

  constructor(playerCount: number, botCount: number) {
    this.totalPlayers = playerCount + botCount;
    for (let index = 0; index < botCount; index++) {
      this.AddBot(new PlayerInfo("Bot" + (index + 1), true))
    }
  }


  GetPlayerType(getType: PlayerType) {
    let type: PlayerInfo[] = []
    this.list.forEach((playerType, playerInfo) => {
      if (playerType == getType)
        type.push(playerInfo)
    })
    return type
  }


  AddBot(botInfo: PlayerInfo) {
    let temp = Part.random[Math.floor(Math.random() * 3)]
    this.Add(botInfo, temp)
  }


  Add(player: PlayerInfo, type: PlayerType) {
    if (this.list.has(player))
      return;
    this.list.set(player, type);
    if (this.list.size == this.totalPlayers)
      this.Start()
  }


  Draw(){
    let typeScissors: PlayerInfo[] = this.GetPlayerType(PlayerType.scissors)
    let typeRock: PlayerInfo[] = this.GetPlayerType(PlayerType.rock)
    let typePaper: PlayerInfo[] = this.GetPlayerType(PlayerType.paper)

    if (typeScissors.length > 0 && typeRock.length > 0 && typePaper.length > 0) {
      for (let key of this.list.keys()) {
        this.winner.push(key)
      }

    }
    else if (typeScissors.length == this.totalPlayers || typeRock.length == this.totalPlayers || typePaper.length == this.totalPlayers) {
      for (let key of this.list.keys()) {
        this.winner.push(key)
      }
      this.list.forEach((value, key)=>{
        key.IncreaseDraw()
      })
    }
  }


  Start() {
    let typeScissors: PlayerInfo[] = this.GetPlayerType(PlayerType.scissors)
    let typeRock: PlayerInfo[] = this.GetPlayerType(PlayerType.rock)
    let typePaper: PlayerInfo[] = this.GetPlayerType(PlayerType.paper)

    if (typeScissors.length > 0 && typeRock.length > 0 && typePaper.length > 0) {
      //判斷都有出現
      for (let key of this.list.keys()) {
        this.winner.push(key)
      }
    }
    else if (typeScissors.length == this.totalPlayers || typeRock.length == this.totalPlayers || typePaper.length == this.totalPlayers) {
      //判斷都出一樣
      for (let key of this.list.keys()) {
        this.winner.push(key)
      }
    }

    if(this.winner.length == this.totalPlayers){
      //以 勝利人數 = 總人數 來判斷情況為平手
      this.list.forEach((value, key)=>{
        key.IncreaseDraw()
      })
    }
    else {
      //非平手，取勝者
      let winType!: PlayerType
      if(typeScissors.length > 0 && typeRock.length > 0 ){
        winType = PlayerType.rock
      }
      else if(typeRock.length > 0 && typePaper.length > 0 ){
        winType = PlayerType.paper
      }
      else if(typeScissors.length > 0 && typePaper.length > 0 ){
        winType = PlayerType.scissors
      }
      // this.winner = this.GetPlayerType(winType)
      this.list.forEach((value, key)=>{
        //結算勝敗數增減
        if(value == winType){
          key.IncreaseWin()
          this.winner.push(key)
        }
        else
          key.IncreaseLose()
      })
    }
  }
}
