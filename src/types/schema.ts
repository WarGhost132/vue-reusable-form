interface FieldAttrs {
  [key: string]: any
}

interface Field {
  type: 'input' | 'textarea' | 'select' | 'checkbox'
  label: string
  attrs?: FieldAttrs
  rules?: ((value: any) => boolean | string)[]
  options?: { value: string; label: string }[]
}

export interface Schema {
  [key: string]: Field
}
