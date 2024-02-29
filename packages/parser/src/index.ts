import fs from 'node:fs'
import path from 'node:path'
import type { Puzzle } from '../types/types'
import { NonParser } from './parsers'

const ROOT_PATH = new URL(`${path.dirname(import.meta.url)}`).pathname

export function parser(filePath: fs.PathOrFileDescriptor): Puzzle {
  let puzzle = {} as Puzzle
  const input = fs.readFileSync(path.resolve(ROOT_PATH, filePath.toString()))
  const extName = path.extname(filePath.toString()).replace('.', '')

  switch (extName) {
    case 'non':
      puzzle = new NonParser().parse(input.toString())
      break

    default:
      throw new Error(`${extName} file is not support`)
  }
  return puzzle
}
