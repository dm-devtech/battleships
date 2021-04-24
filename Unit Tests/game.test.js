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
      grid = jest.spyOn(game, 'grid').mockReturnValue(gridMock())
      turn = jest.spyOn(game, 'turn')
      expect(game.turn("A5")).toEqual("Hit")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(1);
    });

    it('testing missing a ship', function() {
      grid = jest.spyOn(game, 'grid').mockReturnValue(gridMock())
      turn = jest.spyOn(game, 'turn')
      expect(game.turn("A6")).toEqual("Miss")
      expect(turn).toHaveBeenCalled()
      expect(turn).toHaveBeenCalledTimes(1);
    });
  })

})
