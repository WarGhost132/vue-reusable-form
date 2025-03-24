<script lang="ts" setup>
import FormGenerator from '@/components/FormGenerator.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const schema = ref({
  email: {
    type: 'input',
    label: 'Email',
    attrs: {
      type: 'email',
      placeholder: 'Введите email'
    }
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
    label: 'Согласен с условиями'
  }
})

const formData = ref({
  email: '',
  country: 'ru',
  agree: false
})

const saveForm = (data: any) => {
  store.dispatch('saveForm', data)
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
h1 {
  text-align: center;
  margin-bottom: 10px;
}

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
