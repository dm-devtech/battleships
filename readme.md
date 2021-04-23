plan

array of 10 x 10 arrays

A5 convert coordinate to array slices [0][4]

random (H or V) & random number 1 to 10 (0-9) x 1 for battleships (5 length)
random (H or V) & random number 1 to 10 (0-9) x 2 for destroyers (4 length)

if RNG+0-4 shows free space ----- then BBBBB if RNG+0-3 shows free space ---- then DDDD

Input A5 -> output = hit or miss.  
In array when ship is hit B/D changes to X

edge cases
wrong format input
ships cannot be placed across each other

tests
1. Mock an array of battleships with hard coded locations
2. test hit or miss until game over
3. logic for RNG for placing battleships into array of arrays
4. tests for edge cases

Input A5 -> output = hit or miss.  
In array when ship is hit B/D changes to X

hit until all ships destroyed then "game over"
