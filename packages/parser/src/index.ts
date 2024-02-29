import fs from 'node:fs'
import path from 'node:path'
import type { Parser, Puzzle } from '../types/types'
import { NonParser } from './parsers'

const ROOT_PATH = new URL(`${path.dirname(import.meta.url)}`).pathname

export function parser(filePath: fs.PathOrFileDescriptor): Puzzle {
  let parser: Parser
  let puzzle: Puzzle = {} as Puzzle
  const input = fs.readFileSync(path.resolve(ROOT_PATH, filePath.toString()))
  const extName = path.extname(filePath.toString()).replace('.', '')

  switch (extName) {
    case 'non':
      parser = new NonParser()
      puzzle = parser.parse(input.toString())
      break

    default:
      throw new Error(`ParserType ${extName} is not support`)
  }
  return puzzle
}

parser('../input/webpbn000001.non')
