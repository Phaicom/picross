<script setup lang="ts">
const cols = ref(5)
const rows = ref(5)
</script>

<template>
  <div px-6 flex="~ col items-center gap-6">
    <!-- timer section -->
    <section bg="my-light-violet-10 cover bottom 2xl:center no-repeat [url(/timer-bg.svg)]" h-62px w-full rounded-lg p-4>
      <div flex="~ items-center">
        <span text-24px font-600>00:00:00</span>
        <button btn="~ my-blue" ml-auto uppercase>
          start
        </button>
      </div>
    </section>
    <!-- board section -->
    <section>
      <!-- board wrapper -->
      <div max-h-60vh w-100vw overflow-x-auto overflow-y-auto px-6 flex="~ justify-center">
        <div my-1>
          <table table-fixed select-none>
            <tfoot>
              <tr>
                <!-- preview -->
                <th />
                <!-- hint -->
                <th v-for="(_, index) in cols" :key="index" :class="{ 'bg-my-light-gray': index % 2 === 0, 'rounded-bl-lg': index === 0, 'rounded-br-lg': index === cols - 1 }" align-start>
                  <div flex="~ col" h-full font-400>
                    <div v-for="i in 3" :key="i" h-5>
                      {{ i }}
                    </div>
                  </div>
                </th>
              </tr>
            </tfoot>
            <tbody>
              <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                <th :class="{ 'bg-my-light-gray': rowIndex % 2 === 0, 'rounded-tl-lg': rowIndex === 0, 'rounded-bl-lg': rowIndex === rows - 1 }">
                  <!-- hint -->
                  <div flex="~ row justify-end" font-400>
                    <div v-for="i in 3" :key="i" px-1>
                      {{ i }}
                    </div>
                  </div>
                </th>
                <td v-for="(_, cellIndex) in cols" :key="cellIndex" border="2 solid my-light-gray">
                  <div h-13 w-13 text-center>
                    {{ `${cellIndex}:${rowIndex}` }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!-- cell type choosing section -->
    <section mt-4>
      <div rounded-lg bg-white p-4 flex="~ row gap-4" class="shadow-cell-type">
        <div bg-my-dark-blue h-10 w-10 border="2px solid my-light-gray" />
        <div h-10 w-10 border="2px solid my-light-gray" flex="~ items-center justify-center">
          <i i-ph-x-bold text="7 my-red" />
        </div>
        <div h-10 w-10 border="2px solid my-light-gray" flex="~ items-center justify-center">
          <i i-ph-circle-bold text="7 my-sky-blue" />
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.shadow-cell-type {
  box-shadow: 0px 5px 24px 0px #4b69ff1a;
}
</style>
