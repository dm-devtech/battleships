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

    if(ship1Row === ship2Row) ship1Row += 1
    if(ship2Row === ship3Row) ship2Row += 1
    if(ship3Row === ship1Row) ship3Row += 1

    gameGrid[ship1Row].splice([ship1Column], 5, 'B', 'B', 'B', 'B', 'B')
    gameGrid[ship2Row].splice([ship2Column], 4, 'D', 'D', 'D', 'D')
    gameGrid[ship3Row].splice([ship3Column], 4, 'D', 'D', 'D', 'D')
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

  turn(coordinate) {
    const [row, column] = this.convertCoordinate(coordinate)
    const finalGrid = this.gameGrid
    return finalGrid[row][column] === "D" || finalGrid[row][column] === "B" ? "Hit" : "Miss"
  }

}

module.exports = Battleships
