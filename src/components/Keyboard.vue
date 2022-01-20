<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { checkValidKey } from '../utils/validate';
import Key from './Key.vue';

const props = defineProps({ keyboard: Array });
const emit = defineEmits(['keyboard']);

const keySet1 = ref(props.keyboard.slice(0, 10));
const keySet2 = ref(props.keyboard.slice(10, 19));
const keySet3 = ref(props.keyboard.slice(19, 29));

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

watch(
  () => [...props.keyboard],
  () => {
    keySet1.value = props.keyboard.slice(0, 10);
    keySet2.value = props.keyboard.slice(10, 19);
    keySet3.value = props.keyboard.slice(19, 29);
  }
);
</script>

<template>
  <section>
    <div class="keys">
      <Key v-for="value in keySet1" :value="value" @keyboard="handleKey" />
    </div>
    <div class="keys">
      <Key v-for="value in keySet2" :value="value" @keyboard="handleKey" />
    </div>
    <div class="keys">
      <Key v-for="value in keySet3" :value="value" @keyboard="handleKey" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  margin-top: 1rem;
  div.keys {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    @media only screen and (max-width: 600px) {
      gap: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
