<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ cell: String, index: Number, wiggle: Array, evaluation: Array });
const element = ref(null);

watch(
  () => [...props.evaluation],
  () => {
    const evaluation = props.evaluation.flat();
    if (evaluation[props.index] === 'reset') {
      if (element.value.classList.contains('flip')) {
        element.value.classList.remove('flip');
        void element.value.offsetWidth; // Required to restart a CSS animation
        element.value.classList.add('flip');
      }
      const classes = [...element.value.classList].filter((classes) => classes !== 'flip');
      setTimeout(() => {
        element.value.classList.remove(...classes);
      }, 250);
      setTimeout(() => {
        element.value.classList.remove('flip');
      }, 500);
      return;
    }
    if (!evaluation[props.index]) return;
    const value = evaluation[props.index];
    const delay = 100 * (props.index % 5);
    setTimeout(() => {
      element.value.classList.add('flip');
    }, delay);
    setTimeout(() => {
      element.value.classList.add(value);
    }, 250 + delay);
  }
);

watch(
  () => [...props.wiggle],
  () => {
    const last = props.wiggle.slice(Math.max(props.wiggle.length - 5, 0));
    if (!last.includes(props.index)) return;
    element.value.classList.remove('wiggle');
    void element.value.offsetWidth; // Required to restart a CSS animation
    element.value.classList.add('wiggle');
  }
);

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
div.wiggle {
  animation: wiggle 0.3s;
  animation-iteration-count: 3;
}
div.flip {
  animation: flip 0.5s;
  animation-iteration-count: 1;
}

@keyframes wiggle {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0px);
  }
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

@keyframes flip {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
</style>
