import fs from 'node:fs'
import path from 'node:path'

const ROOT_PATH = new URL(`${path.dirname(import.meta.url)}`).pathname

export function readFileSync(filePath: fs.PathOrFileDescriptor, options?:
  | {
    encoding: BufferEncoding
    flag?: string | undefined
  }
  | BufferEncoding) {
  return fs.readFileSync(path.resolve(ROOT_PATH, filePath.toString()), options)
}
