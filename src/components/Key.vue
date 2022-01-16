<script setup>
defineProps({ value: Object });
defineEmits(['keyboard']);
</script>

<template>
  <div
    class="key"
    :class="{ wide: value.key === 'ENTER' || value.key === 'DELETE' }"
    @click="$emit('keyboard', value.key)"
  >
    {{ value.key }}
  </div>
  <div v-if="value.key === 'P'" class="break"></div>
  <div v-if="value.key === 'L'" class="break"></div>
</template>

<style lang="scss" scoped>
div.key {
  cursor: pointer;
  user-select: none;
  color: $text;
  background-color: $key;
  width: 40px;
  height: 60px;
  border-radius: 5px;
  display: grid;
  place-items: center;
}
div.wide {
  width: 80px;
}
div.break {
  flex-basis: 100%;
}
</style>
