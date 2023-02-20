This is a react app scaffolded with vite

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Instructions
This application allows a user to easily create a form by passing some props into the the `Form` component
The Form can handle different data types such as: `text, email, number and password`

### Props that can be passed
```typescript
    interface ValidationRules {
      required?: boolean;
      min?: number;
      max?: number;
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      validate?: (str: string | number) => string;
    }
```
All the props item are standard HTML input attributes except for `validate`.
The `validate` callback is function that takes a string as argument and returns a string, it's purpose is
to customise the validation of any input value.

```typescript
    const MIN_STRING_LENGTH = 8;

    const customValidation = (str: string): string => {
      if (str.length < MIN_STRING_LENGTH) {
        return `Please check that input has at least ${MIN_STRING_LENGTH} characters`;
      }
      return "";
    }
```
### Example how to use form 
```tsx
    import { Form } from './Form';

    const onSubmit = (data: FormData) => {
      return;
    }
    
    export const Login = () => {
      return(
        <Form fields={
          {
            email: {name: "Email", required: true, type: 'email', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i},
            password: {name: "Password", required: true, type: 'password', validate: customValidation},
          }
        }
          onSubmit={onSubmit}
        />
      )
    }
```
