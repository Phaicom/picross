<template>
  <div flex="~ row gap-2 justify-center" mb-4 text-2xl>
    <h1 class="bg-rainbow animate-bg bg-clip-text text-center text-transparent font-bold uppercase">
      <slot />
    </h1>
    <span>🏆🎖️🫡</span>
  </div>
</template>

<style scoped>
.current-color {
  accent-color: rgba(130, 221, 53, 1);
}

.bg-rainbow {
  background-size: 20em 100%;
  background-image: linear-gradient(
    to left in hsl,
    hsl(359deg, 100%, 50%),
    hsl(180deg, 100%, 50%),
    hsl(0deg, 100%, 50%)
  );
}

.animate-bg {
  animation: animate-bg 2s infinite linear;
}

@keyframes animate-bg {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 130% 0;
  }
}
</style>
