export const errorMessages = {
  required: 'This field is required',
  minLength: (minLength: number) => `This field must be at least ${minLength} characters long`,
  maxLength: (maxLength: number) => `This field must be no more than ${maxLength} characters long`,
  min: (min: number) => `This field must be at least ${min}`,
  max: (max: number) => `This field must be no more than ${max}`,
  pattern: (name: string) => `Invalid ${name} format`
}
