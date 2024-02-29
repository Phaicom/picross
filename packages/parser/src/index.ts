import type { PathOrFileDescriptor } from 'node:fs'
import { extname } from 'node:path'
import type { Puzzle } from '@picross/shared'
import { NonParser } from './parsers'
import { readFileSync } from './utils'

export function parser(path: PathOrFileDescriptor): Puzzle {
  let puzzle = {} as Puzzle
  const input = readFileSync(path.toString(), 'utf-8')
  const extName = extname(path.toString()).replace('.', '')

  switch (extName) {
    case 'non':
      puzzle = new NonParser().parse(input.toString())
      break

    default:
      throw new Error(`${extName} file is not support`)
  }
  return puzzle
}
