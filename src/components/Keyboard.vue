<script setup>
import { onBeforeMount, onMounted } from 'vue';
import { checkValidKey } from '../utils/validate';
import Key from './Key.vue';

defineProps({ keyboard: Array });
const emit = defineEmits(['keyboard']);

const handleKey = (key) => {
  emit('keyboard', key);
};

const handleKeyEvent = (event) => {
  const valid = checkValidKey(event.code);
  if (!valid) return;
  let key = event.key.toUpperCase();
  if (key === 'BACKSPACE') key = 'DELETE';
  handleKey(key);
};

onMounted(() => {
  window.addEventListener('keyup', handleKeyEvent);
});
onBeforeMount(() => {
  window.removeEventListener('keyup', handleKeyEvent);
});
</script>

<template>
  <section>
    <Key v-for="value in keyboard" :value="value" @keyboard="handleKey" />
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
  justify-content: center;
}
</style>
