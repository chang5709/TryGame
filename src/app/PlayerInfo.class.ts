export class PlayerInfo {
  public isBot: boolean
  public name: string
  public winCount = 0
  public loseCount = 0
  public drawCount = 0
  constructor(name: string, isbot: boolean = false) {
    this.name = name
    this.isBot = isbot
  }


  IncreaseDraw(){
    this.drawCount++
  }


  IncreaseWin(){
    this.winCount++
  }


  IncreaseLose(){
    this.loseCount++
  }



}
