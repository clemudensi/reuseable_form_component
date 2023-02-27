import React from 'react';
import { Form } from '@/components';
import * as Styled from '@/components';
import { FieldProp } from '@/types';

export const SingUpForm = () => {
  const onSubmit = (data: FieldProp) => {
    // handle form submission here
    console.log(data);
  };

  return (
    <Styled.Container>
      <Styled.H2Typography>Sign Up Form</Styled.H2Typography>
      <Styled.CardContainer>
        <Form fields={
          {
            email: {name: "Email", required: true, type: 'email'},
            password: {name: "Password", required: true, type: 'password'},
            firsName: {name: "First Name", required: true, type: 'text', minLength: 3},
            lasName: {name: "Last Name", required: true, type: 'text'},
            age: {name: "Age", required: true, type: 'number', min: 18, max: 85},
            company: {name: "Company Name", type: 'text', pattern: "[Ww]ooga\\.com.*"}
          }
        }
          onSubmit={onSubmit}
        />
      </Styled.CardContainer>
    </Styled.Container>
  );
};

