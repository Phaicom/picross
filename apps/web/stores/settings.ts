export const useSettingsStore = defineStore('settings', () => {
  const width = ref(5)
  const height = ref(5)
  const boardSize = ref(BOARD_SIZE.find(size => size.text === 'medium')?.value || 12)

  return { width, height, boardSize }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot))
