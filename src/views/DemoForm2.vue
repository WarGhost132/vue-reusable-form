<script lang="ts" setup>
import FormGenerator from '@/components/FormGenerator.vue';
import CustomDatePicker from '@/components/CustomDatePicker.vue';
import type { Schema } from '@/types/schema';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const schema = ref<Schema>({
  country: {
    type: 'select',
    label: 'Страна',
    options: [
      {
        value: 'ru',
        label: 'Россия'
      },
      {
        value: 'us',
        label: 'США'
      },
      {
        value: 'uk',
        label: 'Великобритания'
      }
    ]
  },
  birthdate: {
    type: 'custom',
    label: 'Дата рождения'
  },
  agree: {
    type: 'checkbox',
    label: 'Согласен с условиями',
    rules: [
      (value: any) => value || 'Вы должны согласиться с условиями'
    ]
  }
})

const formData = ref({
  country: 'ru',
  birthdate: '',
  agree: false
})

const saveForm = (data: any) => {
  store.dispatch('saveForm', data)
  formData.value = {
    country: 'ru',
    birthdate: '',
    agree: false
  }
}

const resetForm = () => {
  formData.value = {
    country: 'ru',
    birthdate: '',
    agree: false
  }
}
</script>

<template>
  <div>
    <h1>Форма 2</h1>
    <FormGenerator
      :schema="schema"
      v-model="formData"
      @save="saveForm"
      @cancel="resetForm"
    >
      <template #birthdate>
        <CustomDatePicker 
          :modelValue="formData.birthdate" 
          @update:modelValue="(value) => formData.birthdate = value"
        />
      </template>
    </FormGenerator>
  </div>
</template>

<style lang="scss" scoped>
input {
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
</style>
