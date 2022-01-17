<script setup>
const emit = defineEmits(['close']);
</script>

<template>
  <main class="header">
    <section>
      <span class="material-icons hide">close</span>
      <h1>How To Play</h1>
      <span class="material-icons" @click="emit('close')">close</span>
    </section>
    <div class="info">
      <p>Guess the word in 6 tries.</p>
      <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>

      <div class="squares">
        <div class="square">H</div>
        <div class="square">E</div>
        <div class="square">L</div>
        <div class="square">L</div>
        <div class="square">O</div>
      </div>

      <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>

      <div class="squares">
        <div class="square correct">I</div>
        <div class="square absent">M</div>
        <div class="square absent">A</div>
        <div class="square absent">G</div>
        <div class="square absent">E</div>
      </div>

      <p>A green letter is in the word and in the correct spot. The word is not image but it starts with an I.</p>

      <div class="squares">
        <div class="square absent">R</div>
        <div class="square absent">A</div>
        <div class="square present">D</div>
        <div class="square absent">I</div>
        <div class="square absent">O</div>
      </div>

      <p>A yellow letter is in the word but in the wrong spot. The letter D exists in the word but not right there.</p>

      <div class="squares">
        <div class="square absent">C</div>
        <div class="square absent">L</div>
        <div class="square absent">E</div>
        <div class="square multiple">A</div>
        <div class="square absent">N</div>
      </div>

      <p>
        This double colored letter will give you a hint. The letter A is in the correct spot, but the word contains more
        than one letter A.
      </p>

      <p>And all the other dark gray letters indicate that they are not in the word in any spot.</p>
      <p>Good luck!</p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: fixed;
  top: 1rem;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start !important;
  align-items: center;
  background-color: $background;
  overflow: auto;
  @media only screen and (max-width: 400px) {
    top: 0.5rem;
  }
  span.hide {
    opacity: 0;
    pointer-events: none;
  }
  section {
    margin-bottom: 1rem;
  }
  div.info {
    color: $text;
    width: 340px;
    div.squares {
      display: flex;
      gap: 5px;
      div.square {
        width: 40px;
        height: 40px;
        border: 1px solid $border;
        color: $text;
        font-size: 1.5rem;
        display: grid;
        place-items: center;
      }
    }
  }
}
</style>
