<script setup>
const props = defineProps({ score: Object });
</script>

<template>
  <section>
    <article>
      <span>Current Streak</span>
      <span>{{ props.score.streak }}</span>
    </article>
    <article>
      <span>Wins / Losses</span>
      <span>{{ props.score.wins }} / {{ props.score.losses }}</span>
    </article>
    <article>
      <span>Points</span>
      <span>{{ props.score.points }}</span>
    </article>
  </section>
</template>

<style lang="scss" scoped>
section {
  width: 100%;
  padding: 0.5rem;
  article {
    display: flex;
    justify-content: space-between;
  }
  span {
    font-weight: 400;
    font-size: 0.8rem;
  }
}
</style>
