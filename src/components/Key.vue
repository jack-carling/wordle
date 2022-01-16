<script setup>
import { computed } from 'vue';

const props = defineProps({ value: Object });
defineEmits(['keyboard']);

const classObject = computed(() => {
  if (props.value.key === 'ENTER' || props.value.key === 'DELETE') {
    return 'wide';
  } else {
    return props.value.evaluation;
  }
});
</script>

<template>
  <div class="key" :class="classObject" @click="$emit('keyboard', value.key)">
    {{ value.key }}
  </div>
</template>

<style lang="scss" scoped>
div.key {
  cursor: pointer;
  user-select: none;
  color: $text;
  background-color: $key;
  width: 40px;
  height: 60px;
  border-radius: 5px;
  display: grid;
  place-items: center;
  &:hover {
    opacity: 0.75;
  }
  @media only screen and (max-width: 600px) {
    width: 30px;
    height: 45px;
  }
}
div.wide {
  width: 80px;
  @media only screen and (max-width: 600px) {
    width: 60px;
    font-size: 0.7rem;
  }
}
div.absent {
  background-color: $absent;
}
div.present {
  background-color: $present;
}
div.correct {
  background-color: $correct;
}
div.break {
  flex-basis: 100%;
}
</style>
