type ValidationRule = (value: any) => true | string

interface FieldValidation {
  rules: ValidationRule[]
}

export interface FormValidation {
  [field: string]: FieldValidation
}
