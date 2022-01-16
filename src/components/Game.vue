<script setup>
import { ref, watch } from 'vue';
import { initializeBoard, initializeKeyboard, getRandomWord } from '../utils/initialize';
import { words } from '../utils/words';

import Board from './Board.vue';
import Keyboard from './Keyboard.vue';
import Errors from './Errors.vue';

const board = ref(initializeBoard());
const keyboard = ref(initializeKeyboard());
const errors = ref([]);
const wiggle = ref([]);

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
    const isValidWord = words.includes(word.toLowerCase());
    if (isValidWord) {
      row.value++;
      // Handle evaluation
    } else {
      errors.value.unshift('Not in word list');
    }
  } else {
    errors.value.unshift('Not enough letters');
  }
};

watch(
  () => [...errors.value],
  (oldValue, newValue) => {
    if (oldValue.length < newValue.length) return;
    for (let i = row.value * 5; i < row.value * 5 + 5; i++) {
      wiggle.value.push(i);
    }
    setTimeout(() => {
      errors.value.pop();
    }, 1500);
  }
);
</script>

<template>
  <Errors :errors="errors" />
  <Board :board="board" :errors="errors" :wiggle="wiggle" />
  <Keyboard :keyboard="keyboard" @keyboard="handleKey" />
</template>

<style lang="scss" scoped></style>
