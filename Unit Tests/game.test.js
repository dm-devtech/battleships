import Battleships from '../src/Battleships.js'

describe('Scorecard class', function() {
  let game
  let grid
  let turn
  let gridMock

  beforeEach(function() {
    game = new Battleships()
    gridMock = jest.fn( ()=>
      [[0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      ["B","B","B","B","B",0,0,0,0,0],
      [0,0,0,0,"D","D","D","D",0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,"D","D","D","D",0,0],
      [0,0,0,0,0,0,0,0,0,0]])
  });

  afterEach(function() {
    jest.clearAllMocks();
  })

  describe('testing game', function() {
    it('testing hit ship', function() {
      const shipPlacement = jest.spyOn(game, 'allocateShipsRandomly').mockImplementation(() => gridMock())
      const turn = jest.spyOn(game, 'turn')
      game.gameGrid = shipPlacement()
      expect(game.turn("A5")).toEqual("Hit")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(1);
    });

    it('testing missing a ship', function() {
      const shipPlacement = jest.spyOn(game, 'allocateShipsRandomly').mockImplementation(() => gridMock())
      game.gameGrid = shipPlacement()
      const turn = jest.spyOn(game, 'turn')
      expect(game.turn("A6")).toEqual("Miss")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(1);
    });

    it('testing random grid created', function() {
      const shipPlacement = jest.spyOn(game, 'allocateShipsRandomly').mockImplementation(() => gridMock())
      game.gameGrid = shipPlacement()
      console.log(game.gameGrid)
      const turn = jest.spyOn(game, 'turn')
      expect(game.turn("E9")).toEqual("Hit")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(1);
      expect(shipPlacement).toHaveBeenCalled()
      expect(shipPlacement).toHaveBeenCalledTimes(1);
    });
  })

})