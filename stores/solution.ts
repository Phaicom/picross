export const useSolutionStore = defineStore('solutionStore', () => {
  const solution = reactive<number[][]>([])

  function generate(grid: number[][]) {
    solution.splice(0, solution.length)
    Object.assign(solution, grid)
    Object.assign(solution, solution.map(row => row.map(() => Math.floor(Math.random() * 2))))
  }

  return { solution, generate }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSolutionStore, import.meta.hot))
