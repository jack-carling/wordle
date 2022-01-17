<script setup></script>

<template>
  <section>
    <span class="material-icons">help_outline</span>
    <h1>Wordle</h1>
    <span class="material-icons">emoji_events</span>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
h1 {
  margin: 0;
  font-size: 2rem;
  padding: 0 5rem;
}
span {
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
}
h1,
span {
  color: $text;
}
</style>
