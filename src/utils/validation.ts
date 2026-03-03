/**
 * Input Validation Utilities using Zod
 * Provides type-safe schema validation for all user inputs
 */

import { z } from 'zod';
import { logWarning } from './errorLogger';

/**
 * Common validation schemas
 */
export const schemas = {
  email: z.string().email('Invalid email address').min(1, 'Email is required'),

  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters'),

  phone: z
    .string()
    .regex(/^\+?[\d\s()-]+$/, 'Invalid phone number')
    .optional()
    .or(z.literal('')),

  url: z.string().url('Invalid URL').optional().or(z.literal('')),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),

  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),

  uuid: z.string().uuid('Invalid UUID'),

  positiveNumber: z.number().positive('Must be a positive number'),

  nonEmptyString: z.string().min(1, 'This field is required'),
};

/**
 * Webinar registration schema
 */
export const webinarRegistrationSchema = z.object({
  email: schemas.email,
  firstName: schemas.name,
  lastName: schemas.name,
  phone: schemas.phone,
  company: z.string().optional(),
  timezone: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type WebinarRegistrationInput = z.infer<typeof webinarRegistrationSchema>;

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  name: schemas.name,
  email: schemas.email,
  subject: schemas.nonEmptyString.max(200, 'Subject must be less than 200 characters'),
  message: schemas.nonEmptyString
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * File upload schema
 */
export const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: 'Invalid file' }),
  fileName: z.string().min(1).max(255),
  fileType: z.string().regex(/^[\w-]+\/[\w-+.]+$/, 'Invalid MIME type'),
  fileSize: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
});

export type FileUploadInput = z.infer<typeof fileUploadSchema>;

/**
 * API query parameters schema
 */
export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

/**
 * Validates data against a schema and returns typed result
 */
export function validate<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach(err => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });

      logWarning('Validation failed', {
        action: 'validate',
        metadata: { errors, data },
      });

      return { success: false, errors };
    }

    throw error;
  }
}

/**
 * Validates data and throws on error
 */
export function validateOrThrow<T extends z.ZodType>(
  schema: T,
  data: unknown,
  context?: string
): z.infer<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      throw new Error(`Validation failed${context ? ` in ${context}` : ''}: ${errors}`);
    }
    throw error;
  }
}

/**
 * Safe parse that returns null on error
 */
export function safeParse<T extends z.ZodType>(
  schema: T,
  data: unknown
): z.infer<T> | null {
  const result = schema.safeParse(data);
  return result.success ? result.data : null;
}

/**
 * Validates partial data (useful for forms)
 */
export function validatePartial<T extends z.ZodObject<any>>(
  schema: T,
  data: unknown
): { success: true; data: Partial<z.infer<T>> } | { success: false; errors: Record<string, string> } {
  return validate(schema.partial(), data);
}

/**
 * Creates a validator function for a schema
 */
export function createValidator<T extends z.ZodType>(schema: T) {
  return (data: unknown) => validate(schema, data);
}

/**
 * Sanitizes string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitizes object recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item =>
        typeof item === 'string' ? sanitizeString(item) : item
      );
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const result = schemas.email.safeParse(email);
  return result.success;
}

/**
 * Validates URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Strips HTML tags from string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Truncates string to max length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Validates and sanitizes user input
 */
export function validateAndSanitize<T extends z.ZodType>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string> } {
  const validation = validate(schema, data);

  if (!validation.success) {
    return validation;
  }

  // Sanitize string fields
  const sanitized = sanitizeObject(validation.data);

  return { success: true, data: sanitized };
}
