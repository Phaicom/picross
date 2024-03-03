<script setup lang="ts">
const time = ref('00:00:00')
const isStartTimer = ref(false)
let interval: NodeJS.Timeout | null = null

function startTimer() {
  time.value = '00:00:00'
  const startTime = new Date().getTime()
  isStartTimer.value = true
  interval = setInterval(() => {
    const currentTime = new Date().getTime()
    const elapedTime = currentTime - startTime
    const seconds = Math.floor(elapedTime / 1000) % 60
    const minutes = Math.floor(elapedTime / 1000 / 60) % 60
    const hours = Math.floor(elapedTime / 1000 / 60 / 60)
    time.value = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }, 1000)
}

function stopTimer() {
  isStartTimer.value = false
  clearInterval(interval as NodeJS.Timeout)
  interval = null
}

function pad(num: number) {
  return (num < 10 ? '0' : '') + num
}

onUnmounted(() => {
  clearInterval(interval as NodeJS.Timeout)
})
</script>

<template>
  <section bg="my-light-violet-10 cover bottom 2xl:center no-repeat [url(/timer-bg.svg)]" h-62px w-full select-none rounded-lg p-4>
    <div flex="~ items-center">
      <span text-24px font-600>{{ time }}</span>
      <button v-show="!isStartTimer" btn="~ my-blue" ml-auto uppercase @click="startTimer()">
        start
      </button>
      <button v-show="isStartTimer" btn="~ my-red" ml-auto uppercase @click="stopTimer()">
        stop
      </button>
    </div>
  </section>
</template>
