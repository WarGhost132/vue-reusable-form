<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import Notification from '@/components/Notification.vue';
</script>

<template>
  <div class="container">
    <div class="box">
      <div class="box-links">
        <RouterLink to="/">Demo 1</RouterLink>
        <RouterLink to="/demo2">Demo 2</RouterLink>
      </div>

      <div class="box-form">
        <RouterView />
      </div>
    </div>
  </div>

  <Notification />
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 20px;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 100%;
  max-width: 800px;
  background: $box-color;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  .box-links {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;

    a {
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 6px;
      background: $primary-color;
      color: $button-text-color;
      font-weight: bold;
      transition: all 0.3s ease-in-out, transform 0.2s ease;

      &:hover {
        background: $secondary-color;
        transform: scale(1.05);
      }

      &.router-link-active {
        background: $secondary-color;
      }
    }
  }

  .box-form {
    width: 100%;
    position: relative;
  }
}
</style>
