import React from 'react';
import { useForm } from '../hooks';
import { FormProps } from '../types';

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
  const { register, errors, handleSubmit, isSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(fields).map(([name, props]) => (
        <div key={name}>
          <label htmlFor={name}>{props.name}</label>
          <input
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
          />
          {!(errors) || errors[name] && <p role="alert">{errors[name]}</p>}
        </div>
      ))}
      <button type="submit" disabled={isSubmit}>Submit</button>
    </form>
  );
};

export default Form;
