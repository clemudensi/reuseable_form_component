import React from 'react';
import { useForm } from '@/hooks';
import { FormProps } from '@/types';
import * as Styled from '@/components';

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const { register, errors, handleSubmit, isSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit, true)}>
      {Object.entries(fields).map(([name, props]) => (
        <Styled.FormInputContainer key={name}>
          <Styled.FormInputLabel htmlFor={name}>{props.name}</Styled.FormInputLabel>
          <Styled.FormInput
            type={props.type}
            id={name}
            {...register(name, {
              pattern: props.pattern,
              required: props.required,
              max: props.max,
              maxLength: props.max,
              min: props.min,
              minLength: props.minLength,
            })}
            placeholder={props.name}
            className={props.className}
            autoComplete="true"
          />
          {!(errors) || errors[name] &&
            <Styled.AlertText fontSize={'0.75rem'} role="alert">
              {errors[name]}
            </Styled.AlertText>}
        </Styled.FormInputContainer>
      ))}
      <Styled.CenterItems>
        <Styled.Button type="submit" disabled={!isSubmit}>Submit</Styled.Button>
      </Styled.CenterItems>
    </form>
  );
};

export { Form };
