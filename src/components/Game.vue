<script setup>
import { ref } from 'vue';
import { initializeBoard, initializeKeyboard, getRandomWord } from '../utils/initialize';
import { words } from '../utils/words';

import Board from './Board.vue';
import Keyboard from './Keyboard.vue';

const board = ref(initializeBoard());
const keyboard = ref(initializeKeyboard());

const word = getRandomWord();
const row = ref(0);

const handleKey = (key) => {
  if (key === 'DELETE') return handleDelete();
  if (key === 'ENTER') return handleSubmit();
  const index = board.value.findIndex((value) => value === '');
  const isCurrentRow = Math.floor(index / 5) === row.value;
  if (!isCurrentRow) return;
  board.value[index] = key;
};

const handleDelete = () => {
  const index = board.value.findIndex((value) => value === '');
  const isCurrentRow = Math.floor((index - 1) / 5) === row.value;
  if (!isCurrentRow) return;
  const lastIndex = board.value.filter((value) => value !== '').length - 1;
  board.value[lastIndex] = '';
};

const handleSubmit = () => {
  const index = board.value.findIndex((value) => value === '');
  const currentRow = Math.floor((index - 1) / 5);
  const isCurrentRow = currentRow === row.value;
  const rowComplete = index % 5 === 0;
  // Handle last row
  if (isCurrentRow && rowComplete) {
    let word = '';
    const indexes = currentRow * 5;
    for (let i = indexes; i < indexes + 5; i++) {
      word += board.value[i];
    }
    console.log(word);
    row.value++;
    // Handle evaluation
  }
};
</script>

<template>
  <Board :board="board" />
  <Keyboard :keyboard="keyboard" @keyboard="handleKey" />
</template>

<style lang="scss" scoped></style>
