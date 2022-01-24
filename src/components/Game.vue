<script setup>
import { nextTick, ref, watch } from 'vue';
import { initializeBoard, initializeKeyboard, getRandomWord } from '../utils/initialize';
import { words } from '../utils/words';

import Board from './Board.vue';
import Keyboard from './Keyboard.vue';
import Errors from './Errors.vue';
import Modal from './Modal.vue';
import { getPoints } from '../utils/score';

const board = ref(initializeBoard());
const keyboard = ref(initializeKeyboard());
const errors = ref([]);
const wiggle = ref([]);
const evaluation = ref([null, null, null, null, null, null]);

const props = defineProps({ gameOver: Boolean });
const emit = defineEmits(['game-over', 'reset']);

const word = ref(getRandomWord());
const row = ref(0);

const showModal = ref(false);
const score = ref({ wins: 0, losses: 0, points: 0, streak: 0, status: '' });

const logWord = () => {
  if (import.meta.env.DEV) console.log('[development] secret word:', word.value);
};
logWord();

const handleKey = (key) => {
  if (props.gameOver) return;
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
    emit('game-over');
    const points = getPoints(row.value);
    score.value.points += points;
    score.value.wins += 1;
    score.value.streak += 1;
    score.value.status = 'win';
    setTimeout(() => {
      showModal.value = true;
    }, 750);
    return;
  }
  if (row.value === 6) {
    emit('game-over');
    score.value.losses += 1;
    score.value.streak = 0;
    score.value.status = 'lose';
    setTimeout(() => {
      showModal.value = true;
    }, 750);
  }
};

const handleBoardEvaluation = (input, index) => {
  const result = ['', '', '', '', ''];

  const inputLetters = input.split('');
  const wordLetters = word.value.split('');

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

const handleReset = () => {
  board.value = initializeBoard();
  keyboard.value = initializeKeyboard();
  errors.value = [];

  const reset = [[], [], [], [], [], []];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      reset[i][j] = 'reset';
    }
  }
  evaluation.value = reset;

  word.value = getRandomWord();
  row.value = 0;

  nextTick(() => {
    evaluation.value = [null, null, null, null, null, null];
  });

  logWord();
};

const handleModalReset = () => {
  showModal.value = false;
  setTimeout(() => {
    emit('reset');
  }, 500);
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

watch(
  () => props.gameOver,
  () => {
    // Reset game when gameOver changes back to false
    if (!props.gameOver) handleReset();
  }
);
</script>

<template>
  <transition name="fade-modal">
    <Modal
      v-if="showModal"
      :word="word"
      :score="score"
      :row="row"
      @reset="handleModalReset"
      @close="showModal = false"
    />
  </transition>
  <Errors :errors="errors" />
  <Board :board="board" :errors="errors" :wiggle="wiggle" :evaluation="evaluation" />
  <Keyboard :keyboard="keyboard" @keyboard="handleKey" />
</template>

<style lang="scss" scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: all 0.75s ease-in-out;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>
