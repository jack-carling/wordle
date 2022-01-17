<script setup>
import { ref } from 'vue';
import Game from './components/Game.vue';
import Header from './components/Header.vue';
import HowToPlay from './components/HowToPlay.vue';

const showHelp = ref(false);
</script>

<template>
  <Header @open-help="showHelp = true" />
  <Game />
  <transition name="fade">
    <HowToPlay v-if="showHelp" @close="showHelp = false" />
  </transition>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}
body {
  margin: 0;
  padding: 1rem;
  background-color: $background;
  @media only screen and (max-width: 400px) {
    padding: 0.5rem;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
