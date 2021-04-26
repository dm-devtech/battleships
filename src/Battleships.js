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

  randomShipCoordinates() {
    let uniqueRows = new Set
    let uniqueColumns = new Set

    while(true){
      if(uniqueRows.size >= 3) break
      if(uniqueRows.size < 3) uniqueRows.add(this.randomNumber(8))
    }

    while(true){
      if(uniqueColumns.size >= 3) break
      if(uniqueColumns.size < 3) uniqueColumns.add(this.randomNumber(8))
    }

    let [ship1Row, ship2Row, ship3Row] = [...uniqueRows]
    let [ship1Column, ship2Column, ship3Column] = [...uniqueColumns]

    return [ship1Row, ship1Column, ship2Row, ship2Column, ship3Row, ship3Column]
  }

  allocateShipsRandomly() {
    let gameGrid = this.blankGrid()
    const [ship1Row, ship1Column, ship2Row, ship2Column, ship3Row, ship3Column] = this.randomShipCoordinates()

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

  addHitMarker(turn, row, column) {
    if(turn === "Hit") this.gameGrid[row].splice([column], 1, 'X')
  }

  hitOrMiss(grid, row, column) {
      return grid[row][column] === "D" || grid[row][column] === "B" ? "Hit" : "Miss"
  }

  isGameOver() {
    const flattenedGrid = this.gameGrid.flat()
    let hits = 0

    for(let i = 0; i < flattenedGrid.length; i++){
      if(flattenedGrid[i] === "X") hits += 1
    }

    const gameOver = hits === 13
    return gameOver
  }

  turn(coordinate) {
    const [row, column] = this.convertCoordinate(coordinate)
    const turnResult = this.hitOrMiss(this.gameGrid, row, column)
    this.addHitMarker(turnResult, row, column)
    return this.turnMessage(turnResult, row, column)
  }

  turnMessage(turnResult, row, column) {
    if(this.isGameOver()){
      return "Game Over"
    }else {
      return this.isShipSunk(row) && turnResult === "Hit" ? "Sunk" : turnResult
    }
  }

}

module.exports = Battleships
