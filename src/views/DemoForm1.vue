<script lang="ts" setup>
import FormGenerator from '@/components/FormGenerator.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const schema = ref({
  name: {
    type: 'input',
    label: 'Имя',
    attrs: {
      placeholder: 'Введите имя'
    }
  },
  email: {
    type: 'input',
    label: 'Email',
    attrs: {
      type: 'email',
      placeholder: 'Введите email'
    }
  },
  message: {
    type: 'textarea',
    label: 'Сообщение',
    attrs: {
      rows: 4,
      placeholder: 'Введите сообщение'
    }
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

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
