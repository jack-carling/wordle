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
const evaluation = ref([null, null, null, null, null, null]);
const gameOver = ref(false);

const word = getRandomWord();
const row = ref(0);

console.log(word);

const handleKey = (key) => {
  if (gameOver.value) return;
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
    word = word.toLowerCase();
    const isValidWord = words.includes(word);
    if (isValidWord) {
      row.value++;
      evaluateWord(word);
    } else {
      errors.value.unshift('Not in word list');
    }
  } else {
    errors.value.unshift('Not enough letters');
  }
};

const evaluateWord = (input) => {
  const result = [];

  for (let i = 0; i < word.length; i++) {
    const key = keyboard.value.find((value) => value.key === input[i].toUpperCase());
    if (word[i] === input[i]) {
      key.evaluation = 'correct';
      result.push('correct');
    } else if (word.includes(input[i])) {
      if (key.evaluation !== 'correct') key.evaluation = 'present';
      result.push('present');
    } else {
      if (!key.evaluation) key.evaluation = 'absent';
      result.push('absent');
    }
  }
  const index = evaluation.value.findIndex((value) => value === null);
  evaluation.value[index] = result;
  if (evaluation.value[index].every((value) => value === 'correct')) {
    gameOver.value = true;
    errors.value.unshift('Congratulations');
  }
};

watch(
  () => [...errors.value],
  (oldValue, newValue) => {
    if (oldValue.length < newValue.length) return;
    if (oldValue[0] !== 'Congratulations') {
      for (let i = row.value * 5; i < row.value * 5 + 5; i++) {
        wiggle.value.push(i);
      }
    }
    setTimeout(() => {
      errors.value.pop();
    }, 1500);
  }
);
</script>

<template>
  <Errors :errors="errors" />
  <Board :board="board" :errors="errors" :wiggle="wiggle" :evaluation="evaluation" />
  <Keyboard :keyboard="keyboard" @keyboard="handleKey" />
</template>

<style lang="scss" scoped></style>
