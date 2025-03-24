<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  schema: Object,
  modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const model = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  model.value = newValue
}, { deep: true })

const save = () => emit('save', model)
const cancel = () => {
  model.value = { ...props.modelValue }
  emit('cancel')
}
</script>

<template>
  <form @submit.prevent="save">
    <div v-for="(field, name) in schema" :key="name" class="form-group">
      <label v-if="field.type !== 'checkbox'" :for="name">{{ field.label }}</label>

      <slot :name="name">
        <input v-if="field.type === 'input'" :id="name" v-model="model![name]" v-bind="field.attrs">

        <textarea v-else-if="field.type === 'textarea'" :id="name" v-model="model![name]" v-bind="field.attrs"></textarea>

        <select v-else-if="field.type === 'select'" :id="name" v-model="model![name]" v-bind="field.attrs">
          <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
        </select>

        <div v-else-if="field.type === 'checkbox'" class="checkbox-container">
          <input type="checkbox" :id="name" v-model="model![name]" v-bind="field.attrs">
          <label :for="name">{{ field.label }}</label>
        </div>
      </slot>
    </div>

    <div class="buttons">
      <button type="submit">Сохранить</button>
      <button type="button" @click="cancel">Отмена</button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 1rem;

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid $input-border-color;
    border-radius: 4px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 2px solid $input-border-color-focus;
    }
  }

  textarea {
    resize: vertical;
    min-height: 50px;
    max-height: 200px;
    overflow-y: auto;
  }

  .checkbox-container {
    display: flex;
    gap: 10px;
    align-items: center;

    input[type="checkbox"] {
      width: auto;
      vertical-align: middle;
    }

    label {
      font-weight: 400;
      display: inline-block;
      margin-bottom: 0;
    }
  }
}

.buttons {
  display: flex;
  gap: 10px;

  button {
    border: none;
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 6px;
    background: $primary-color;
    color: $button-text-color;
    font-weight: bold;
    transition: all 0.3s ease-in-out, transform 0.2s ease;

    &:hover {
      background: $primary-color-hover;
      transform: scale(1.05);
    }
  }
}
</style>
