import React from 'react';
import Form from '../components/Form';
import { FieldProp } from '../types';

const LoginForm = () => {
  const onSubmit = (data: FieldProp) => {
    // handle form submission here
    console.log(data);
  };

  return (
    <Form fields={
      {
        email: { name: "Email", required: true, type: 'email'},
        password: {name: "Password", required: true, type: 'password'},
        firsName: {name: "First Name", required: true, type: 'text', minLength: 20},
        lasName: {name: "Last Name", required: true, type: 'text'},
        age: {name: "Age", required: true, type: 'number', min: 18, max: 85}
      }
    }
    onSubmit={onSubmit}
  />
  );
};

export default LoginForm;
