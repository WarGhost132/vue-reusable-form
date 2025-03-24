interface FieldAttrs {
  [key: string]: any
}

interface BaseField {
  label: string
  attrs?: FieldAttrs
  rules?: ((value: any) => boolean | string)[]
}

interface InputField extends BaseField {
  type: 'input' | 'textarea' | 'checkbox'
}

interface SelectField extends BaseField {
  type: 'select'
  options: { value: string; label: string }[]
}

interface CustomField extends BaseField {
  type: 'custom'
}

type Field = InputField | SelectField | CustomField

export interface Schema {
  [key: string]: Field
}
