import * as yup from 'yup';

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]{7,15}$/, 'Please enter a valid phone number'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
});

export type RegisterFormData = yup.InferType<typeof registerSchema>;
