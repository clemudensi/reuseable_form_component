import { FormEvent } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../src/hooks';
import { act } from '@testing-library/react-hooks/dom';
import { errorMessages } from '../src/copy';

const name = 'Test User';
const email = 'user@mail.com';

const onSubmit = jest.fn();

describe('useForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  });

  test('submitting a valid form should call the submit callback with form data', async () => {
    const { result } = renderHook(() => useForm());

    await act(() => {
      const nameField = result.current.register('name', { required: true });
      const emailField = result.current.register('email', {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      });

      nameField.onChange({ target: { name: 'name', value: name } });
      emailField.onChange({ target: { name: 'email', value: email } });
   });

    await act(() => {
      result.current.handleSubmit(onSubmit)({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      name,
      email,
    });
  });

  test('submitting an invalid form should not call the submit callback', async () => {
    const { result } = renderHook(() => useForm());

    await act(async () => {
      const nameField = result.current.register('name', { required: true });
      const emailField = result.current.register('email', {
        required: true,
        pattern: /\S+@\S+\.\S+/,
      });

      // fill in form data and validate fields
      nameField.onFocus();
      nameField.onChange({ target: { name: 'name', value: '' } });

      emailField.onFocus();
      emailField.onChange({ target: { name: 'email', value: 'fake_email' } });
    });

    // validate form
    await act(async () => {
      result.current.validateForm();
    });

    await act(async () => {
      result.current.handleSubmit(onSubmit)({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>);
    })

    expect(result.current.errors).toStrictEqual({ name: errorMessages.required, email: errorMessages.pattern('email')})
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('resetting of form values', async () => {
    const { result } = renderHook(() => useForm());

    await act(async () => {
      const nameField = result.current.register('name', { required: true });
      const emailField = result.current.register('email', {
        required: true,
        pattern: /\S+@\S+\.\S+/,
      });

      nameField.onChange({ target: { name: 'name', value: name } });
      emailField.onChange({ target: { name: 'email', value: email } });
    });

    await act(async () => {
      result.current.handleSubmit(onSubmit, true)({preventDefault: onSubmit} as unknown as FormEvent<HTMLFormElement>);
    })

    expect(result.current.values?.name).toBe('');
    expect(result.current.values?.email).toBe('');
  });
});
