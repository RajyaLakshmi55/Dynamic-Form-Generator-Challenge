import { z } from 'zod';

// Define the field schema
const fieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'email', 'select', 'radio', 'textarea', 'checkbox']), // Add supported types
  label: z.string(),
  required: z.boolean().optional(),
  placeholder: z.string().optional(),
  validation: z
    .object({
      pattern: z.string(),
      message: z.string(),
    })
    .optional(),
  options: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),
});

// Define the overall form schema
export const formSchemaValidator = z.object({
  formTitle: z.string(),
  fields: z.array(fieldSchema).optional(),
});
