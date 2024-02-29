import type { PathOrFileDescriptor } from 'node:fs'
import { extname } from 'node:path'
import type { Puzzle } from '@picross/shared'
import { NonParser } from './parsers'
import { readFileSync } from './utils'

const nonParser = new NonParser()

export function parser(path: PathOrFileDescriptor): Puzzle {
  const input = readFileSync(path, 'utf-8')
  const extName = extname(path.toString()).replace('.', '')

  switch (extName) {
    case 'non':
      return nonParser.parse(input.toString())

    default:
      throw new Error(`${extName} file is not supported`)
  }
}
