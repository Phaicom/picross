import { CellTypes } from '~/types/puzzle'

export const usePointerStore = defineStore('pointer', () => {
  const row = ref(0)
  const column = ref(0)
  const cellType = ref<CellTypes>(CellTypes.Fill)

  return { row, column, cellType }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePointerStore, import.meta.hot))
