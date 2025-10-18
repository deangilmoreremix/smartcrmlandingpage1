import { useState, useCallback } from 'react'

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
  email?: boolean
  url?: boolean
}

export interface FieldConfig {
  [key: string]: ValidationRule
}

export interface ValidationErrors {
  [key: string]: string
}

export interface FormState {
  values: Record<string, string>
  errors: ValidationErrors
  touched: Record<string, boolean>
  isValid: boolean
  isSubmitting: boolean
}

/**
 * Custom hook for form validation
 */
export const useFormValidation = (initialValues: Record<string, string>, validationRules: FieldConfig) => {
  const [formState, setFormState] = useState<FormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isValid: true,
    isSubmitting: false,
  })

  /**
   * Validates a single field value
   */
  const validateField = useCallback((name: string, value: string): string | null => {
    const rules = validationRules[name]
    if (!rules) return null

    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }

    // Skip other validations if field is empty and not required
    if (!value && !rules.required) return null

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${rules.minLength} characters`
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} must be no more than ${rules.maxLength} characters`
    }

    // Email validation
    if (rules.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    // URL validation
    if (rules.url) {
      try {
        new URL(value)
      } catch {
        return 'Please enter a valid URL'
      }
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} format is invalid`
    }

    // Custom validation
    if (rules.custom) {
      return rules.custom(value)
    }

    return null
  }, [validationRules])

  /**
   * Validates all fields
   */
  const validateForm = useCallback((): ValidationErrors => {
    const errors: ValidationErrors = {}

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formState.values[fieldName] || '')
      if (error) {
        errors[fieldName] = error
      }
    })

    return errors
  }, [formState.values, validateField, validationRules])

  /**
   * Updates field value and validates it
   */
  const setFieldValue = useCallback((name: string, value: string) => {
    setFormState(prev => {
      const newValues = { ...prev.values, [name]: value }
      const fieldError = validateField(name, value)
      const newErrors = { ...prev.errors }

      if (fieldError) {
        newErrors[name] = fieldError
      } else {
        delete newErrors[name]
      }

      // Check if form is valid
      const hasErrors = Object.keys(newErrors).length > 0

      return {
        ...prev,
        values: newValues,
        errors: newErrors,
        isValid: !hasErrors,
      }
    })
  }, [validateField])

  /**
   * Marks field as touched
   */
  const setFieldTouched = useCallback((name: string, touched: boolean = true) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [name]: touched },
    }))
  }, [])

  /**
   * Handles input change
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFieldValue(name, value)
  }, [setFieldValue])

  /**
   * Handles input blur
   */
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setFieldTouched(name, true)
  }, [setFieldTouched])

  /**
   * Resets the form
   */
  const resetForm = useCallback(() => {
    setFormState({
      values: initialValues,
      errors: {},
      touched: {},
      isValid: true,
      isSubmitting: false,
    })
  }, [initialValues])

  /**
   * Submits the form
   */
  const handleSubmit = useCallback(async (onSubmit: (values: Record<string, string>) => Promise<void> | void) => {
    setFormState(prev => ({ ...prev, isSubmitting: true }))

    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({
        ...prev,
        errors,
        isValid: false,
        isSubmitting: false,
        touched: Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      }))
      return
    }

    try {
      await onSubmit(formState.values)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }))
    }
  }, [formState.values, validateForm, validationRules])

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    isValid: formState.isValid,
    isSubmitting: formState.isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleChange,
    handleBlur,
    resetForm,
    handleSubmit,
    validateField,
    validateForm,
  }
}

// Common validation rules
export const commonValidationRules = {
  email: {
    required: true,
    email: true,
  },
  password: {
    required: true,
    minLength: 8,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
  url: {
    required: true,
    url: true,
  },
  phone: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
    custom: (value: string) => {
      if (value && value.replace(/\D/g, '').length < 10) {
        return 'Please enter a valid phone number'
      }
      return null
    },
  },
}