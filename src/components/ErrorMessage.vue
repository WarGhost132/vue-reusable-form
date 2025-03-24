<script lang="ts" setup>
defineProps({
  error: String
})
</script>

<template>
  <span v-if="error" class="error-message">{{ error }}</span>
</template>


<style lang="scss" scoped>
.error-message {
  color: $input-error;
  font-size: 12px;
  margin-top: 5px;
}
</style>
