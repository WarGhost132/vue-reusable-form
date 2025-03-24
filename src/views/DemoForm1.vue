<script lang="ts" setup>
import FormGenerator from '@/components/FormGenerator.vue';
import type { Schema } from '@/types/schema';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const schema = ref<Schema>({
  name: {
    type: 'input',
    label: 'Имя',
    attrs: {
      placeholder: 'Введите имя'
    },
    rules: [
      (value: any) => value.trim() !== '' || 'Поле обязательно для заполнения',
      (value: any) => value.trim().length >= 2 || 'Имя должно содержать минимум 2 символа'
    ]
  },
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
  message: {
    type: 'textarea',
    label: 'Сообщение',
    attrs: {
      rows: 4,
      placeholder: 'Введите сообщение'
    },
    rules: [
      (value: string) => value.trim().length >= 10 || 'Сообщение должно содержать минимум 10 символов'
    ]
  }
})

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const saveForm = (data: any) => {
  store.dispatch('saveForm', data)
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    message: ''
  }
}
</script>

<template>
  <div>
    <h1>Форма 1</h1>
    <FormGenerator
      :schema="schema"
      v-model="formData"
      @save="saveForm"
      @cancel="resetForm"
    />
  </div>
</template>
