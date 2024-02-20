import type { Hint } from '~/types/puzzle'

export const useHintsStore = defineStore('hintsStore', () => {
  const row = reactive<Hint[][]>([])
  const col = reactive<Hint[][]>([])

  function generate(solution: number[][]) {
    row.splice(0, row.length)
    col.splice(0, col.length)

    Object.assign(row, _generateHint(solution))
    Object.assign(col, _generateHint(reverseRowToColumn(solution)))
  }

  function _generateHint(arr: number[][]): Hint[][] {
    const result: Hint[][] = []
    for (const row of arr) {
      const hint: Hint[] = []
      row.join('').split('0').filter(pre => pre || false).map(value => value.split('').map(n => +n).reduce((pre, cur) => pre + cur)).forEach((value) => {
        hint.push({ value, isCompleted: false })
      })

      result.push(hint)
    }
    return result
  }

  return { row, col, generate }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useHintsStore, import.meta.hot))
