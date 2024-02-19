export const usePuzzleStore = defineStore('puzzleStore', () => {
  const age = ref(0)

  function increment(num: number) {
    age.value += num
  }

  return {
    age,
    increment,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePuzzleStore, import.meta.hot))
