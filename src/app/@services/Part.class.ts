import { PlayerType } from './../@models/game.model';
import { PlayerInfo } from './../PlayerInfo.class';

export class Part {
  public totalPlayers: number = 0;
  public static random = [PlayerType.scissors, PlayerType.rock, PlayerType.paper]
  public list: Map<PlayerInfo, PlayerType> = new Map<PlayerInfo, PlayerType>();
  public winner: PlayerInfo[] = []
  public isSettle: boolean = false


  constructor(playerCount: number, botCount: number) {
    this.totalPlayers = playerCount + botCount;
    for (let index = 0; index < botCount; index++) {
      this.AddBot(new PlayerInfo("Bot" + (index + 1), true))
    }
  }

  GetBotPlayType() {
    //item.list.get(GetInfoByName(item.list,"Bot1")
    //item.GetBotPlayType

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

  Start() {
    let typeScissors: PlayerInfo[] = this.GetPlayerType(PlayerType.scissors)
    let typeRock: PlayerInfo[] = this.GetPlayerType(PlayerType.rock)
    let typePaper: PlayerInfo[] = this.GetPlayerType(PlayerType.paper)

    if (typeScissors.length > 0 && typeRock.length > 0 && typePaper.length > 0) {
      //判斷都有出現
      this.list.forEach((value, key) => {
        key.IncreaseDraw()
      })
      this.isSettle = true
      return;
    }
    else if (typeScissors.length == this.totalPlayers || typeRock.length == this.totalPlayers || typePaper.length == this.totalPlayers) {
      //判斷都出一樣
      this.list.forEach((value, key) => {
        key.IncreaseDraw()
      })
      this.isSettle = true
      return;
    }
    else {
      //非平手，取勝者
      let winType!: PlayerType
      if (typeScissors.length > 0 && typeRock.length > 0)
        winType = PlayerType.rock
      else if (typeRock.length > 0 && typePaper.length > 0)
        winType = PlayerType.paper
      else if (typeScissors.length > 0 && typePaper.length > 0)
        winType = PlayerType.scissors
      this.list.forEach((value, key) => {
        //結算勝敗數增減
        if (value == winType) {
          key.IncreaseWin()
          this.winner.push(key)
        }
        else
          key.IncreaseLose()
      })
      this.isSettle = true;
    }
  }
}
