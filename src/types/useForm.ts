import React, { ChangeEvent, FocusEvent } from 'react';

type FieldProp = {
  [key: string]: string;
};

interface ValidationRules {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (str: string) => string;
}

interface RegisterReturnValue<T> extends ValidationRules {
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

interface UseFormResult<T> {
  register: (
    name: keyof T,
    validationRules?: ValidationRules,
  ) => any;
  handleSubmit: (callback: (data: T) => void) => (event: React.FormEvent<HTMLFormElement>) => void;
  values?: FieldProp;
  reset?: () => void;
  errors?: { [key: string]: string };
  isSubmit?: boolean;
}

interface FormFieldProps extends ValidationRules {
  name?: string;
  className?: string;
  type?: 'text' | 'number' | 'email' | 'password';
}

interface FormFields  {
  [key: string]: FormFieldProps;
}

interface FormProps {
  fields: FormFields;
  onSubmit: (data: FieldProp) => void;
}

export type {
  FieldProp,
  ValidationRules,
  RegisterReturnValue,
  UseFormResult,
  FormFields,
  FormProps
}
