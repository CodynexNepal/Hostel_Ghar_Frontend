import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;
