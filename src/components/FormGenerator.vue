<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useFormValidation } from '@/composables/useForm'
import ErrorMessage from '@/components/ErrorMessage.vue'

const props = defineProps({
  schema: Object,
  modelValue: Object
})

const emit = defineEmits(['save', 'cancel'])

const model = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  model.value = newValue
}, { deep: true })

const validationRules = props.schema || {}
const { isValid, errors, validateField, validateForm } = useFormValidation(validationRules)

const save = () => {
  if (model.value) {
    validateForm(model.value)
    if (isValid.value) {
      emit('save', model)
    }
  }
}
const cancel = () => {
  model.value = { ...props.modelValue }
  emit('cancel')
}
</script>

<template>
  <form @submit.prevent="save">
    <div v-for="(field, name) in schema" :key="name" class="form-group">
      <label v-if="field.type !== 'checkbox'" :for="name">{{ field.label }}</label>

      <slot v-if="$slots[name]" :name="name" :model="model![name]" />

      <template v-else>
        <div v-if="field.type === 'input'">
          <input
            :id="name"
            v-model="model![name]"
            v-bind="field.attrs"
            @blur="validateField(name, model![name])"
            :class="{ 'input-error': errors[name] }"
          />
          <ErrorMessage :error="errors[name]" />
        </div>
  
        <div v-else-if="field.type === 'textarea'">
          <textarea
            :id="name"
            v-model="model![name]"
            v-bind="field.attrs"
            @blur="validateField(name, model![name])"
            :class="{ 'input-error': errors[name] }"
          ></textarea>
          <ErrorMessage :error="errors[name]" />
        </div>
  
        <div v-else-if="field.type === 'select'">
          <select
            :id="name"
            v-model="model![name]"
            v-bind="field.attrs"
            @blur="validateField(name, model![name])"
            :class="{ 'input-error': errors[name] }"
          >
            <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
          <ErrorMessage :error="errors[name]" />
        </div>
  
        <div v-else-if="field.type === 'checkbox'" class="checkbox-container">
          <div class="checkbox-items">
            <input
              type="checkbox"
              :id="name"
              v-model="model![name]"
              v-bind="field.attrs"
              @blur="validateField(name, model![name])"
              :class="{ 'input-error': errors[name] }"
            />
            <label :for="name">{{ field.label }}</label>
          </div>
          <div>
            <ErrorMessage :error="errors[name]" />
          </div>
        </div>
      </template>
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
    flex-direction: column;
    gap: 10px;
    justify-content: center;

    .checkbox-items {
      display: flex;
      align-items: center;
      gap: 10px;
    }

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

  .input-error {
    border: $input-error-border;
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
