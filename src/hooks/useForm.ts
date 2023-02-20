import React, { useState, useEffect, FormEvent } from 'react';
import {
  FieldProp,
  ValidationRules,
  RegisterReturnValue,
  UseFormResult
} from '@/types'

export const useForm = <T extends FieldProp>(): UseFormResult<T> => {
  const [values, setValues] = useState<FieldProp>({});
  const [errors, setErrors] = useState({} as Record<keyof T, string>);
  const [isSubmit, setIsSubmit] = useState(false);
  const [validations, setValidations] = useState<{[x: string]: ValidationRules}>({})

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const error = validateField(name, values[name]);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (callback: (data: T) => void) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
    callback(values as T);
  };

  const reset = () => {
    setValues({});
  };

  const validateField = (name: string, value: string): string | undefined => {
    const rules = validations[name];

    if (!rules) {
      return undefined;
    }

    if (rules?.validate) {
      return rules.validate(value);
    }

    if (rules?.required && !value?.length) {
      return 'This field is required';
    }

    if (rules?.minLength && value.length < rules?.minLength) {
      return `This field must be at least ${rules.minLength} characters long`;
    }

    if (rules?.maxLength && value.length > rules?.maxLength) {
      return `This field must be no more than ${rules.maxLength} characters long`;
    }

    if (rules?.min && Number(value) < rules?.min) {
      return `This field must be at least ${rules.min}`;
    }

    if (rules?.max && Number(value) > rules?.max) {
      return `This field must be no more than ${rules.max}`;
    }

    if (rules?.pattern && !rules?.pattern.test(value)) {
      return 'Invalid format';
    }

    return undefined;
  };

  const validateForm = () => {
    Object.keys(errors).forEach((fieldName: string) => {
      const error = validateField(fieldName, values[fieldName]);
      setErrors(prevState => ({
        ...prevState,
        [fieldName]: error
      }))
    });
  };

  useEffect(() => {
    const isValid = Object.values(errors).filter(filter => filter).length > 0;
    setIsSubmit(isValid);
  }, [errors]);

  const register = (
    name: keyof T,
    validationRules?: ValidationRules,
  ): RegisterReturnValue<T> => {

    return {
      name: String(name),
      value: values[name.toString()] ?? '',
      onBlur,
      onChange,
      onFocus: () => {
        if (validationRules) {
          setValidations(prevState => ({...prevState, [name]: validationRules}));
        }
      },
      required: validationRules?.required,
      min: validationRules?.min,
      max: validationRules?.max,
      minLength: validationRules?.minLength,
      maxLength: validationRules?.maxLength,
      pattern: validationRules?.pattern,
    }
  }

  return {
    values,
    errors,
    register,
    handleSubmit,
    reset,
    isSubmit
  }
}
