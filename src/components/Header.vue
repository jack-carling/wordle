<script setup>
const emit = defineEmits(['open-help', 'reset']);
const props = defineProps({ gameOver: Boolean });
</script>

<template>
  <main class="header">
    <section>
      <span class="material-icons" @click="emit('open-help')">help_outline</span>
      <h1>Wordle</h1>
      <span class="material-icons" :class="{ hide: !props.gameOver }" @click="emit('reset')">replay</span>
    </section>
  </main>
</template>

<style lang="scss" scoped>
span.hide {
  opacity: 0;
  pointer-events: none;
}
</style>
