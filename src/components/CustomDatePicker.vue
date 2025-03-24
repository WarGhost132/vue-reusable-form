<script lang="ts" setup>
import { ref, watch } from 'vue'
import DatePicker from 'vue-datepicker-next'
import 'vue-datepicker-next/index.css'

const props = defineProps<{
  modelValue: string | null
}>()
const emit = defineEmits(['update:modelValue'])

const selectedDate = ref(props.modelValue)

watch(selectedDate, (newDate) => {
  emit('update:modelValue', newDate)
})
</script>

<template>
  <DatePicker
    v-model:value="selectedDate"
    format="YYYY-MM-DD"
    value-type="format"
    :clearable="true"
    placeholder="Выберите дату"
    class="custom-datepicker"
  />
</template>

<style lang="scss" scoped>
.custom-datepicker {
  width: 100%;
  border-radius: 4px;
  font-size: 14px;
}
</style>
