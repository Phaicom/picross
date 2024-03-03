<script setup lang="ts">
const cols = ref(5)
const rows = ref(5)
</script>

<template>
  <section>
    <!-- board wrapper -->
    <div class="w-[calc(100vw-3rem)]" flex="~ justify-center" select-none overflow-auto max="60vh lg:h-55vh">
      <div flex="~ col" w-min font="400">
        <div flex="~ row">
          <!-- hints rows -->
          <div flex="~ col" min-w-min bg-white rounded="tl-lg bl-lg">
            <div v-for="(_, i) in rows" :key="i" h-14 min-w-15 flex="~ row justify-end items-center gap-2.5" p-1 border="odd:l-2 t-2 last:odd:b-2 cell" bg="odd:cell" rounded="first:tl-lg last:bl-lg">
              <div v-for="(_, j) in 3" :key="j">
                {{ j }}
              </div>
            </div>
          </div>
          <!-- cell board -->
          <div flex="~ col" bg-white>
            <!-- row -->
            <div v-for="(_, i) in rows" :key="i" flex="~ row justify-end items-center" min-w-min>
              <div v-for="(_, j) in cols" :key="j" border="l-2 t-2 last:r-2 cell" h-14 w-14 :class="{ 'border-b-2': i === rows - 1 }">
                {{ `${i}:${j}` }}
              </div>
            </div>
          </div>
        </div>
        <!-- hints rows -->
        <div flex="~ row" ml-auto min-w-min bg-white rounded="bl-lg br-lg">
          <div v-for="(_, i) in cols" :key="i" min-h-15 w-14 flex="~ col justify-start items-center" leading-5 border="l-2 odd:b-2 last:odd:r-2 cell" bg="odd:cell" rounded="first:bl-lg last:br-lg">
            <div v-for="(_, j) in 3" :key="j">
              {{ j }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
