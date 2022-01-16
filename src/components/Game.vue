<script setup>
import { ref } from 'vue';
import { initialize } from '../utils/initialize';

import Board from './Board.vue';

const board = ref(initialize());
</script>

<template>
  <Board :board="board" />
</template>

<style lang="scss" scoped></style>
