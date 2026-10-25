import * as yup from 'yup';

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters long')
    .max(100, 'First name must not exceed 100 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long')
    .max(100, 'Last name must not exceed 100 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;
