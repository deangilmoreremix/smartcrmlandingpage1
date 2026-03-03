/**
 * Zod Validation Schemas for Database Operations
 * 
 * SECURITY: These schemas validate ALL user input before database operations
 */

import { z } from 'zod';

const emailSchema = z
  .string()
  .email('Invalid email address')
  .max(255, 'Email must be less than 255 characters')
  .toLowerCase()
  .trim();

const uuidSchema = z.string().uuid('Invalid UUID format');

const urlSchema = z
  .string()
  .url('Invalid URL format')
  .max(2048, 'URL must be less than 2048 characters');

export const webinarRegistrationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name must be less than 100 characters')
    .trim()
    .regex(/^[a-zA-Z\s\-']+$/, 'First name contains invalid characters'),
  
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be less than 100 characters')
    .trim()
    .regex(/^[a-zA-Z\s\-']+$/, 'Last name contains invalid characters'),
  
  email: emailSchema,
  
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional()
    .or(z.literal('')),
  
  company: z
    .string()
    .max(200, 'Company name must be less than 200 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  
  role: z
    .string()
    .max(100, 'Role must be less than 100 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  
  source: z
    .string()
    .max(100, 'Source must be less than 100 characters')
    .default('Website')
    .optional(),
}).strict();

export type WebinarRegistrationInput = z.infer<typeof webinarRegistrationSchema>;

export const mediaFileSchema = z.object({
  fileName: z
    .string()
    .min(1, 'File name is required')
    .max(255, 'File name must be less than 255 characters'),
  
  filePath: z
    .string()
    .min(1, 'File path is required')
    .max(500, 'File path must be less than 500 characters'),
  
  fileSize: z
    .number()
    .int('File size must be an integer')
    .positive('File size must be positive')
    .max(100 * 1024 * 1024, 'File size must be less than 100MB'),
  
  mimeType: z
    .string()
    .refine((type) => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'video/mp4',
        'video/webm',
        'application/pdf',
      ];
      return allowedTypes.includes(type);
    }, 'File type not allowed'),
  
  bucketName: z
    .string()
    .min(1, 'Bucket name is required')
    .max(63, 'Bucket name must be less than 63 characters'),
  
  publicUrl: urlSchema,
  
  userId: z.string().max(100).optional(),
}).strict();

export type MediaFileInput = z.infer<typeof mediaFileSchema>;

export const trainerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  
  title: z
    .string()
    .min(1, 'Title is required')
    .max(150, 'Title must be less than 150 characters')
    .trim(),
  
  bio: z
    .string()
    .max(2000, 'Bio must be less than 2000 characters')
    .trim()
    .optional(),
  
  email: emailSchema.optional(),
  
  imageUrl: urlSchema.optional(),
  
  expertise: z.string().max(500).trim().optional(),
  
  experienceYears: z
    .number()
    .int()
    .min(0)
    .max(100)
    .default(0)
    .optional(),
  
  isActive: z.boolean().default(true).optional(),
  
  displayOrder: z.number().int().min(0).default(0).optional(),
}).strict();

export type TrainerInput = z.infer<typeof trainerSchema>;

export const popupInteractionSchema = z.object({
  sessionId: z.string().min(1).max(100),
  interactionType: z.enum(['view', 'expand', 'dismiss', 'click_cta', 'conversion']),
  popupVariant: z.string().max(50).default('floating_cta').optional(),
  timeOnPage: z.number().int().min(0).max(86400).default(0).optional(),
  scrollDepth: z.number().int().min(0).max(100).default(0).optional(),
  spotsRemaining: z.number().int().min(0).optional(),
  daysRemaining: z.number().int().min(0).optional(),
  deviceType: z.enum(['mobile', 'tablet', 'desktop', 'unknown']).optional(),
  referrerSource: z.string().max(500).optional(),
}).strict();

export type PopupInteractionInput = z.infer<typeof popupInteractionSchema>;

export const popupConversionSchema = z.object({
  sessionId: z.string().min(1).max(100),
  email: emailSchema.optional(),
  conversionType: z.enum(['purchase', 'signup', 'masterclass', 'early_access']),
  timeToConversion: z.number().int().min(0).max(86400).default(0).optional(),
  popupVariant: z.string().max(50).default('floating_cta').optional(),
}).strict();

export type PopupConversionInput = z.infer<typeof popupConversionSchema>;

export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => {
        const path = err.path.join('.');
        return path ? `${path}: ${err.message}` : err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: ['Validation failed'] };
  }
}
