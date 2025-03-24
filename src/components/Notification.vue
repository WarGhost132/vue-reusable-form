<script lang="ts" setup>
import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const notification = computed(() => store.getters.getNotification)

const isVisible = ref(true)

watch(notification, (newNotification) => {
  if (newNotification) {
    isVisible.value = true
    setTimeout(() => {
      store.commit('setNotification', null)
      isVisible.value = false
    }, 5000)
  }
})

const closeNotification = () => {
  store.commit('setNotification', null)
  isVisible.value = false
}
</script>

<template>
  <div v-if="notification" class="notification" v-show="isVisible">
    <p>{{ notification }}</p>
    <button class="close-btn" @click="closeNotification">&times;</button>
    <div class="progress-bar"></div>
  </div>
</template>

<style lang="scss" scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: $primary-color;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: opacity 0.3s ease;
  width: max-content;
  max-width: 100%;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-left: 5px;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  animation: moveProgress 5s linear forwards;
}

@keyframes moveProgress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
