<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="box">Привет, Sass!</div>

  <RouterView />
</template>

<style lang="scss">
.box {
  padding: 20px;
  background: $primary-color;
  color: white;
  font-size: 20px;
  border-radius: 5px;

  &:hover {
    background: $primary-color-hover;
  }
}
</style>
