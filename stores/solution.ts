export const useSolutionStore = defineStore('solution', () => {
  const grid = reactive<number[][]>([])

  function generate(puzzleGrid: number[][]) {
    grid.splice(0, grid.length)
    Object.assign(grid, puzzleGrid)
    Object.assign(grid, grid.map(row => row.map(() => Math.floor(Math.random() * 2))))
  }

  return { grid, generate }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSolutionStore, import.meta.hot))
