class Battleships {

  constructor(){
    this.gameGrid = this.allocateShipsRandomly()
  }

  blankGrid() {
    const grid = [[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]]
    return grid
  };

  randomNumber(max){
    return Math.floor(Math.random() * max)
  }

  randomCoordinates() {
    let [ship1Row, ship1Column] = [this.randomNumber(8), this.randomNumber(5)]
    let [ship2Row, ship2Column] = [this.randomNumber(8), this.randomNumber(5)]
    let [ship3Row, ship3Column] = [this.randomNumber(8), this.randomNumber(5)]
    return [ship1Row, ship1Column, ship2Row, ship2Column, ship3Row, ship3Column]
  }

  allocateShipsRandomly() {
    let gameGrid = this.blankGrid()
    let [ship1Row, ship1Column, ship2Row, ship2Column, ship3Row, ship3Column] = this.randomCoordinates()
    // rerun this if there arent 8 destoryer and 5 bship segments
    if(!gameGrid[ship1Row].includes("B") && !gameGrid[ship1Row].includes("D")) gameGrid[ship1Row].splice([ship1Column], 5, 'B', 'B', 'B', 'B', 'B')
    if(!gameGrid[ship2Row].includes("B") && !gameGrid[ship2Row].includes("D")) gameGrid[ship2Row].splice([ship2Column], 4, 'D', 'D', 'D', 'D')
    if(!gameGrid[ship3Row].includes("B") && !gameGrid[ship3Row].includes("D")) gameGrid[ship3Row].splice([ship3Column], 4, 'D', 'D', 'D', 'D')

    return gameGrid
  }

  convertCoordinate(coordinate) {
    const x = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    const y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const coordinateSplit = coordinate.split("")
    const column = x.indexOf(coordinateSplit[0])
    const row = y.indexOf(parseInt(coordinateSplit[1]))
    return [row, column]
  }

  isShipSunk(row) {
    const sunk = this.gameGrid[row].includes("X") && !this.gameGrid[row].includes("B") && !this.gameGrid[row].includes("D")
    return sunk
  }

  hitMarker(turn, row, column) {
    if(turn === "Hit") this.gameGrid[row].splice([column], 1, 'X')
  }

  hitOrMiss(grid, row, column) {
      return grid[row][column] === "D" || grid[row][column] === "B" ? "Hit" : "Miss"
  }

  isGameOver() {
    let flattenedGrid = this.gameGrid.flat()
    let hits = 0

    for(let i = 0; i < flattenedGrid.length; i++){
      if(flattenedGrid[i] === "X") hits += 1
    }

    const gameOver = hits === 13
    return gameOver
  }

  turn(coordinate) {
    const [row, column] = this.convertCoordinate(coordinate)
    const finalGrid = this.gameGrid
    const turnResult = this.hitOrMiss(finalGrid, row, column)
    this.hitMarker(turnResult, row, column)

    if(this.isGameOver()){
      return "Game Over"
    }else {
      return this.isShipSunk(row) && turnResult === "Hit" ? "Sunk" : turnResult
    }
  }

}

module.exports = Battleships
