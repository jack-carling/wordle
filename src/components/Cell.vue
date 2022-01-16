<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ cell: String });
const element = ref(null);

watch(
  () => props.cell,
  () => {
    if (props.cell) {
      element.value.classList.remove('animate');
      void element.value.offsetWidth; // Required to restart a CSS animation
      element.value.classList.add('animate');
    }
  }
);
</script>

<template>
  <div ref="element">{{ cell }}</div>
</template>

<style lang="scss" scoped>
div {
  user-select: none;
  width: 60px;
  height: 60px;
  border: 1px solid $border;
  color: $text;
  font-size: 2rem;
  display: grid;
  place-items: center;
}
div.animate {
  animation: scale 0.1s;
  animation-iteration-count: 1;
}
@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
