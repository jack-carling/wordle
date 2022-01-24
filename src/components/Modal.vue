<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue';
import Score from './Score.vue';

const props = defineProps({ word: String, score: Object, row: Number });
const emit = defineEmits(['reset', 'close']);
const gameWon = computed(() => (props.score.status === 'win' ? true : false));
const tries = computed(() => {
  if (props.row === 1) return `${props.row} try`;
  return `${props.row} tries`;
});

onMounted(() => {
  window.addEventListener('keyup', handleKey);
});
onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKey);
});

const handleKey = (event) => {
  if (event.code === 'Escape') return emit('close');
  if (event.code === 'Enter') return emit('reset');
};
</script>

<template>
  <main>
    <section class="modal">
      <i class="material-icons close" @click="emit('close')">close</i>
      <template v-if="gameWon">
        <div class="icon win"><i class="material-icons">check</i></div>
        <span class="header">Well done!</span>
        <span class="text">You guessed the correct word ({{ word }}) in {{ tries }}.</span>
      </template>
      <template v-else>
        <div class="icon lose"><i class="material-icons">close</i></div>
        <span class="header">You lost!</span>
        <span class="text">The correct word was {{ word }}.</span>
      </template>
      <Score :score="score" />
      <button @click="emit('reset')">Play again</button>
      <span class="hint">
        Hint: Press <kbd>Enter</kbd> on your keyboard to quickly start a new game or <kbd>Escape</kbd> to close this
        dialog.
      </span>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba($color: $background, $alpha: 0.75);
  padding: 1rem;
  @media only screen and (max-width: 400px) {
    padding: 0.5rem;
  }
  section.modal {
    width: 300px;
    height: max-content;
    background-color: $text;
    margin-top: 5rem;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 5px 5px 5px rgba($color: #000000, $alpha: 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    div.icon {
      color: $text;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: grid;
      place-items: center;
      margin-bottom: 1rem;
      &.win {
        background-color: $correct;
      }
      &.lose {
        background-color: $absent;
      }
    }
    button {
      margin-top: 0.5rem;
      cursor: pointer;
      appearance: none;
      border: none;
      background-color: $key;
      color: $text-light;
      font-weight: 400;
      padding: 0.5rem 1rem;
      border-radius: 999px;
      &:hover {
        opacity: 0.75;
      }
    }
    span {
      font-weight: 400;
      text-align: center;
      color: $text-dark;
    }
    span.text {
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }
    span.hint {
      margin-top: 1rem;
      font-size: 0.7rem;
      // line-height: 1.8;
    }
    i.close {
      cursor: pointer;
      color: $text-dark;
      position: absolute;
      top: 1rem;
      right: 1rem;
      &:hover {
        opacity: 0.5;
      }
    }
  }
}
</style>
