<script setup>
import { ref } from 'vue';
import { initializeBoard, initializeKeyboard } from '../utils/initialize';

import Board from './Board.vue';
import Keyboard from './Keyboard.vue';

const board = ref(initializeBoard());
const keyboard = ref(initializeKeyboard());
</script>

<template>
  <Board :board="board" />
  <Keyboard :keyboard="keyboard" />
</template>

<style lang="scss" scoped></style>
