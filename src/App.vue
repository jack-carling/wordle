<script setup>
import Game from './components/Game.vue';
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <Game />
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
</style>
