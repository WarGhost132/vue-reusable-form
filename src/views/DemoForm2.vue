<script lang="ts" setup>
import FormGenerator from '@/components/FormGenerator.vue';
import type { Schema } from '@/types/schema';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const schema = ref<Schema>({
  email: {
    type: 'input',
    label: 'Email',
    attrs: {
      type: 'email',
      placeholder: 'Введите email'
    },
    rules: [
      (value: any) => value.trim() !== '' || 'Поле обязательно для заполнения',
      (value: any) => /.+@.+\..+/.test(value) || 'Неверный формат email'
    ]
  },
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
  agree: {
    type: 'checkbox',
    label: 'Согласен с условиями',
    rules: [
      (value: any) => value || 'Вы должны согласиться с условиями'
    ]
  }
})

const formData = ref({
  email: '',
  country: 'ru',
  agree: false
})

const saveForm = (data: any) => {
  store.dispatch('saveForm', data)
  formData.value = {
    email: '',
    country: 'ru',
    agree: false
  }
}

const resetForm = () => {
  formData.value = {
    email: '',
    country: 'ru',
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
      <template #email>
        <input type="email" v-model="formData.email" placeholder="Кастомный Email">
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
