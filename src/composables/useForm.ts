import { computed, ref } from 'vue'
import type { FormValidation } from '@/types/validate'

export function useFormValidation(validationRules: FormValidation) {
  const errors = ref<{ [field: string]: string }>({})
  const touched = ref<{ [field: string]: boolean }>({})

  const validateField = (field: string, value: any) => {
    const rules = validationRules[field]?.rules || []
    for (const rule of rules) {
      const result = rule(value)
      if (result !== true) {
        errors.value[field] = result
        return
      }
    }
    delete errors.value[field]
  }

  const validateForm = (formData: { [field: string]: any }) => {
    Object.keys(validationRules).forEach((field) => {
      validateField(field, formData[field])
    })
  }

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  return {
    isValid,
    errors,
    touched,
    validateField,
    validateForm,
  }
}
