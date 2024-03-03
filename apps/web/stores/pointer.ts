import { CellTypes } from '@picross/shared'

export const usePointerStore = defineStore('pointer', () => {
  const row = ref(0)
  const col = ref(0)
  const cellType = ref<CellTypes>(CellTypes.Fill)

  function setCellType(ct: CellTypes) {
    cellType.value = ct
  }

  return { row, col, cellType, setCellType }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePointerStore, import.meta.hot))
