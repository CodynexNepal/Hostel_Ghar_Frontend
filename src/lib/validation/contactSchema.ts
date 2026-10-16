import * as yup from 'yup';

export const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;
