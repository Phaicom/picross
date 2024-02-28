<template>
  <nav px4 py3 text-lg border="b base" flex="~ gap-1 items-center">
    <NuxtLink to="/" title="Picross" text-4xl>
      Picross
    </NuxtLink>
    <div flex="~ gap-1 items-center" ml-auto>
      <NuxtLink rounded p2 title="Github" hover="bg-active" href="https://github.com/Phaicom/picross" target="_blank">
        <div i-ph-github-logo-duotone text-3xl />
      </NuxtLink>
    </div>
  </nav>
</template>
