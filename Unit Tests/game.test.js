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
    jest.restoreAllMocks();
  })

  describe('testing game', function() {
    it('testing missing a ship', function() {
      const shipPlacement = jest.spyOn(game, 'allocateShipsRandomly').mockImplementation(() => gridMock())
      game.gameGrid = shipPlacement()
      const turn = jest.spyOn(game, 'turn')
      expect(game.turn("A6")).toEqual("Miss")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(1);
      expect(shipPlacement).toHaveBeenCalled()
      expect(shipPlacement).toHaveBeenCalledTimes(1);
    });

    it('testing hit ship', function() {
      const shipPlacement = jest.spyOn(game, 'allocateShipsRandomly').mockImplementation(() => gridMock())
      game.gameGrid = shipPlacement()
      const turn = jest.spyOn(game, 'turn')
      expect(game.turn("A5")).toEqual("Hit")
      expect(game.turn("B5")).toEqual("Hit")
      expect(game.turn("C5")).toEqual("Hit")
      expect(game.turn("D5")).toEqual("Hit")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(4);
      expect(shipPlacement).toHaveBeenCalled()
      expect(shipPlacement).toHaveBeenCalledTimes(1);
    });

    it('testing sinking a ship', function() {
      const shipPlacement = jest.spyOn(game, 'allocateShipsRandomly').mockImplementation(() => gridMock())
      game.gameGrid = shipPlacement()
      const turn = jest.spyOn(game, 'turn')
      expect(game.turn("A5")).toEqual("Hit")
      expect(game.turn("B5")).toEqual("Hit")
      expect(game.turn("C5")).toEqual("Hit")
      expect(game.turn("D5")).toEqual("Hit")
      expect(game.turn("E5")).toEqual("Sunk")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(5);
      expect(shipPlacement).toHaveBeenCalled()
      expect(shipPlacement).toHaveBeenCalledTimes(1);
    });

    it('testing game finishes', function() {
      const shipPlacement = jest.spyOn(game, 'allocateShipsRandomly').mockImplementation(() => gridMock())
      game.gameGrid = shipPlacement()
      const turn = jest.spyOn(game, 'turn')
      expect(game.turn("A5")).toEqual("Hit")
      expect(game.turn("B5")).toEqual("Hit")
      expect(game.turn("C5")).toEqual("Hit")
      expect(game.turn("D5")).toEqual("Hit")
      expect(game.turn("E5")).toEqual("Sunk")
      expect(game.turn("E6")).toEqual("Hit")
      expect(game.turn("F6")).toEqual("Hit")
      expect(game.turn("G6")).toEqual("Hit")
      expect(game.turn("H6")).toEqual("Sunk")
      expect(game.turn("E9")).toEqual("Hit")
      expect(game.turn("F9")).toEqual("Hit")
      expect(game.turn("G9")).toEqual("Hit")
      expect(game.turn("H9")).toEqual("All ships sunk. Game Over")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(13);
      expect(shipPlacement).toHaveBeenCalled()
      expect(shipPlacement).toHaveBeenCalledTimes(1);
    });
  })

  describe('edge cases', function() {
    it('format incorrect', function() {
      const turn = jest.spyOn(game, 'turn')
      expect(() => {game.turn("a6")}).toThrowError('Coordinate should be a string and letter should be upper case. Coordinates cannot exceed J10.');
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(1);
    });

    it('turn coordinates exceed grid', function() {
      const turn = jest.spyOn(game, 'turn')
      expect(() => {game.turn("a16")}).toThrowError('Coordinate should be a string and letter should be upper case. Coordinates cannot exceed J10.');
      expect(() => {game.turn("Z99")}).toThrowError('Coordinate should be a string and letter should be upper case. Coordinates cannot exceed J10.');
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(2);
    });
  })

})
