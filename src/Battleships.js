class Battleships {

  constructor(){
  }

  test() {
    console.log("test")
  }

  grid() {
    const grid = [[0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    ["B",0,0,0,0,0,0,0,0,0],
    ["D",0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]]
    return grid
  };

  convertCoordinate(coordinate) {
    const x = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"] // 0
    const y = [1,2,3,4,5,6,7,7,8,9,10] // 4
    console.log(x,y)
    const coordinateSplit = coordinate.split("")
    const column = x.indexOf(coordinateSplit[0])  // 0
    const row = y.indexOf(parseInt(coordinateSplit[1])) // 4
    return [row, column]
  }

  turn(coordinate) {
    const [row, column] = this.convertCoordinate(coordinate)
    const grid = this.grid()
    console.log(grid[row][column])
    if(grid[row][column] === "D" || grid[row][column] === "B"){
      return "Hit"
    }else {
      return "Miss"
    }
  }

}

module.exports = Battleships
