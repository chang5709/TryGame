export class PlayerInfo {
  public isBot: boolean
  public name: string
  public winCount = 0
  public loseCount = 0
  public drawCount = 0
  constructor(name: string, isbot: boolean = false) {
    this.name = name
    this.isBot = isbot
    this.GetWinCountFromStorage()
  }

  //平手數增加
  IncreaseDraw() {
    this.drawCount++
    this.SetWinCountToStorage()
  }

  //勝利數增加
  IncreaseWin() {
    this.winCount++
    this.SetWinCountToStorage()
  }

  //敗北數增加
  IncreaseLose() {
    this.loseCount++
    this.SetWinCountToStorage()
  }


  SetWinCountToStorage() {
    localStorage.setItem(this.name + 'Data', JSON.stringify(this))
  }

  GetWinCountFromStorage() {
    let playerStorage = localStorage.getItem(this.name + 'Data')
    if (playerStorage == undefined)
      this.SetWinCountToStorage()
    else {
      let getStorage = JSON.parse(playerStorage)
      this.winCount = getStorage.winCount
      this.loseCount = getStorage.loseCount
      this.drawCount = getStorage.drawCount
    }
  }

}
