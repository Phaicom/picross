export function* range(start: number, end: number) {
  for (; start <= end; ++start)
    yield start
}

export function last<T>(arr: T[]) {
  return arr[arr.length - 1]
}

function* _combination(a: number, b: number, loc: number[] = []): IterableIterator<number[]> {
  const index = loc.length
  if (index === b) {
    yield loc
    return
  }
  for (const next of range(index ? last(loc) + 1 : 0, a - b + index))
    yield * _combination(a, b, loc.concat(next))
}

export function* combination<T>(arr: T[], b: number) {
  for (const index of _combination(arr.length, b))
    yield index.map(i => arr[i])
}
