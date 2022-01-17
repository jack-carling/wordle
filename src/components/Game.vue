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

if (import.meta.env.DEV) console.log('[development] secret word:', word);

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
  if (index === -1) return (board.value[board.value.length - 1] = '');
  const isCurrentRow = Math.floor((index - 1) / 5) === row.value;
  if (!isCurrentRow) return;
  const lastIndex = board.value.filter((value) => value !== '').length - 1;
  board.value[lastIndex] = '';
};

const handleSubmit = () => {
  let index = board.value.findIndex((value) => value === '');
  index = index === -1 ? 30 : index;
  const currentRow = Math.floor((index - 1) / 5);
  const isCurrentRow = currentRow === row.value;
  const rowComplete = index % 5 === 0;
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
  const index = evaluation.value.findIndex((value) => value === null);
  handleBoardEvaluation(input, index);
  if (evaluation.value[index].every((value) => value === 'correct')) {
    gameOver.value = true;
    errors.value.unshift('Congratulations');
    return;
  }
  if (row.value === 6) {
    gameOver.value = true;
    errors.value.unshift(`The word was ${word}`);
  }
};

const handleBoardEvaluation = (input, index) => {
  const result = ['', '', '', '', ''];

  const inputLetters = input.split('');
  const wordLetters = word.split('');

  const guesses = wordLetters.map((letter) => {
    return { letter, taken: false };
  });

  inputLetters.forEach((letter, index) => {
    if (letter === wordLetters[index]) {
      result[index] = 'correct';
      guesses[index].taken = true;
      const key = keyboard.value.find((value) => value.key === input[index].toUpperCase());
      key.evaluation = 'correct';
    }
  });

  inputLetters.forEach((letter, index) => {
    if (!wordLetters.includes(letter)) {
      result[index] = 'absent';
      const key = keyboard.value.find((value) => value.key === input[index].toUpperCase());
      if (!key.evaluation) key.evaluation = 'absent';
    }
  });

  inputLetters.forEach((letter, index) => {
    if (!result[index]) {
      const takenIndex = guesses.findIndex((guess) => guess.letter === letter && !guess.taken);
      const key = keyboard.value.find((value) => value.key === input[index].toUpperCase());
      if (takenIndex > -1) {
        guesses[takenIndex].taken = true;
        if (key.evaluation !== 'correct') key.evaluation = 'present';
        result[index] = 'present';
      } else {
        if (!key.evaluation) key.evaluation = 'absent';
        result[index] = 'absent';
      }
    } else if (result[index] === 'correct') {
      const multiple = wordLetters.filter((value) => value === letter);
      if (multiple.length <= 1) return;
      const [multipleLetter] = multiple;
      const guess = inputLetters.filter((value) => value === multipleLetter);
      if (guess.length !== multiple.length) {
        if (guess.length > multiple.length) return;
        const [guessLetter] = guess;
        inputLetters.forEach((letter, index) => {
          if (letter === guessLetter && result[index] === 'correct') {
            result[index] = 'multiple';
          }
        });
      }
    }
  });

  evaluation.value[index] = result;
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
