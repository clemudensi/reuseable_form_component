import React, { useState, useEffect, FormEvent } from 'react';
import {
  FieldProp,
  ValidationRules,
  RegisterReturnValue,
  UseFormResult
} from '@/types';
import { errorMessages } from '@/copy';

export const useForm = <T extends FieldProp>(): UseFormResult<T> => {
  const [values, setValues] = useState<FieldProp>({});
  const [errors, setErrors] = useState({} as Record<keyof T, string | undefined>);
  const [isSubmit, setIsSubmit] = useState(false);
  const [validations, setValidations] = useState<{[x: string]: ValidationRules}>({})

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const error = validateField(name, values[name]);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
    validateForm();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (callback: (data: T) => void, isReset?: boolean) => (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
    isSubmit && callback(values as T);
    isReset && reset();
  };

  const reset = () => {
    Object.keys(values).forEach((name) => {
      setValues(prevState => ({
        ...prevState,
        [name]: ''
      }))
    });
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
      return errorMessages.required;
    }

    if (rules?.minLength && value.length < rules?.minLength) {
      return errorMessages.minLength(rules.minLength);
    }

    if (rules?.maxLength && value.length > rules?.maxLength) {
      return errorMessages.maxLength(rules.maxLength);
    }

    if (rules?.min && Number(value) < rules?.min) {
      return errorMessages.min(rules.min);
    }

    if (rules?.max && Number(value) > rules?.max) {
      return errorMessages.max(rules.max);
    }

    if (rules?.pattern) {
      const regex = new RegExp(rules.pattern);
      if (!regex.test(value)) {
        return errorMessages.pattern(name);
      }
    }

    return undefined;
  };

  const validateForm = () => {
    Object.keys(values).forEach((fieldName: string) => {
      const error = validateField(fieldName, values[fieldName]);
      setErrors(prevState => ({
        ...prevState,
        [fieldName]: error
      }))
    });
  };

  useEffect(() => {
    const isValid = Object.values(errors).filter(filter => filter).length === 0;
    setIsSubmit(isValid);
  }, [errors]);

  const register = (
    name: string,
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
    isSubmit,
    validateForm
  }
}
