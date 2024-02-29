/**
 * Represents a puzzle with various properties and clues.
 */
export interface Puzzle {
  catalogue: string
  title: string
  author: string
  copyright: string
  width: number
  height: number
  clues: Clues
}

/**
 * Represents the clues for a puzzle, organized by rows and columns.
 */
export interface Clues {
  rows: PuzzleRowOrColumn
  columns: PuzzleRowOrColumn
}

/**
 * Represents a row or column in a puzzle, defined as a 2D array of numbers.
 */
export type PuzzleRowOrColumn = number[][]

/**
 * Represents a parser for a puzzle, with a method to parse a string input into a Puzzle.
 */
export interface Parser {
  puzzle: Puzzle

  /**
   * Parses a string input into a Puzzle.
   * @param input - The string to parse.
   * @throws {Error} If the input cannot be parsed into a Puzzle.
   * @returns The parsed Puzzle.
   */
  parse: (input: string) => Puzzle
}
