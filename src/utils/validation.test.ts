import { describe, it, expect } from 'vitest';
import {
  schemas,
  validate,
  validateOrThrow,
  safeParse,
  sanitizeString,
  sanitizeObject,
  isValidEmail,
  isValidUrl,
  stripHtml,
  truncate,
  webinarRegistrationSchema,
} from './validation';

describe('validation schemas', () => {
  describe('email', () => {
    it('accepts valid emails', () => {
      expect(schemas.email.safeParse('user@example.com').success).toBe(true);
      expect(schemas.email.safeParse('a.b+tag@domain.co.uk').success).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(schemas.email.safeParse('').success).toBe(false);
      expect(schemas.email.safeParse('not-an-email').success).toBe(false);
      expect(schemas.email.safeParse('@no-user.com').success).toBe(false);
    });
  });

  describe('name', () => {
    it('accepts valid names', () => {
      expect(schemas.name.safeParse('John').success).toBe(true);
      expect(schemas.name.safeParse("O'Brien").success).toBe(true);
      expect(schemas.name.safeParse('Mary-Jane').success).toBe(true);
    });

    it('rejects invalid names', () => {
      expect(schemas.name.safeParse('A').success).toBe(false);
      expect(schemas.name.safeParse('').success).toBe(false);
      expect(schemas.name.safeParse('Name123').success).toBe(false);
      expect(schemas.name.safeParse('<script>alert(1)</script>').success).toBe(false);
    });
  });

  describe('password', () => {
    it('accepts strong passwords', () => {
      expect(schemas.password.safeParse('Password1').success).toBe(true);
      expect(schemas.password.safeParse('MyStr0ngPass!').success).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(schemas.password.safeParse('short').success).toBe(false);
      expect(schemas.password.safeParse('alllowercase1').success).toBe(false);
      expect(schemas.password.safeParse('ALLUPPERCASE1').success).toBe(false);
      expect(schemas.password.safeParse('NoNumbersHere').success).toBe(false);
    });
  });

  describe('uuid', () => {
    it('accepts valid UUIDs', () => {
      expect(schemas.uuid.safeParse('550e8400-e29b-41d4-a716-446655440000').success).toBe(true);
    });

    it('rejects invalid UUIDs', () => {
      expect(schemas.uuid.safeParse('not-a-uuid').success).toBe(false);
      expect(schemas.uuid.safeParse('').success).toBe(false);
    });
  });
});

describe('validate()', () => {
  it('returns success with valid data', () => {
    const result = validate(schemas.email, 'user@example.com');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBe('user@example.com');
    }
  });

  it('returns errors with invalid data', () => {
    const result = validate(schemas.email, 'not-an-email');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toBeDefined();
      expect(Object.keys(result.errors).length).toBeGreaterThan(0);
    }
  });
});

describe('validateOrThrow()', () => {
  it('returns data on valid input', () => {
    const result = validateOrThrow(schemas.email, 'user@example.com');
    expect(result).toBe('user@example.com');
  });

  it('throws on invalid input', () => {
    expect(() => validateOrThrow(schemas.email, 'bad', 'test-context')).toThrow(
      /Validation failed in test-context/
    );
  });
});

describe('safeParse()', () => {
  it('returns data on valid input', () => {
    const result = safeParse(schemas.email, 'user@example.com');
    expect(result).toBe('user@example.com');
  });

  it('returns null on invalid input', () => {
    const result = safeParse(schemas.email, 'bad');
    expect(result).toBeNull();
  });
});

describe('sanitizeString()', () => {
  it('escapes HTML special characters', () => {
    expect(sanitizeString('<script>')).toBe('&lt;script&gt;');
    expect(sanitizeString('"hello"')).toBe('&quot;hello&quot;');
    expect(sanitizeString("it's")).toBe("it&#x27;s");
    expect(sanitizeString('a/b')).toBe('a&#x2F;b');
  });

  it('leaves safe strings unchanged', () => {
    expect(sanitizeString('Hello World')).toBe('Hello World');
    expect(sanitizeString('test@example.com')).toBe('test@example.com');
  });
});

describe('sanitizeObject()', () => {
  it('sanitizes string values in objects', () => {
    const input = { name: '<b>John</b>', age: 30 };
    const result = sanitizeObject(input);
    expect(result.name).toBe('&lt;b&gt;John&lt;&#x2F;b&gt;');
    expect(result.age).toBe(30);
  });

  it('sanitizes nested objects', () => {
    const input = { user: { name: '<script>xss</script>' } };
    const result = sanitizeObject(input);
    expect(result.user.name).toBe('&lt;script&gt;xss&lt;&#x2F;script&gt;');
  });

  it('sanitizes arrays of strings', () => {
    const input = { tags: ['<b>bold</b>', 'safe'] };
    const result = sanitizeObject(input);
    expect(result.tags[0]).toBe('&lt;b&gt;bold&lt;&#x2F;b&gt;');
    expect(result.tags[1]).toBe('safe');
  });
});

describe('isValidEmail()', () => {
  it('returns true for valid emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('returns false for invalid emails', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidUrl()', () => {
  it('returns true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
  });

  it('returns false for invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
    expect(isValidUrl('')).toBe(false);
  });
});

describe('stripHtml()', () => {
  it('removes HTML tags', () => {
    expect(stripHtml('<p>Hello</p>')).toBe('Hello');
    expect(stripHtml('<b>Bold</b> and <i>italic</i>')).toBe('Bold and italic');
    expect(stripHtml('<script>alert(1)</script>')).toBe('alert(1)');
  });

  it('handles strings without HTML', () => {
    expect(stripHtml('plain text')).toBe('plain text');
  });
});

describe('truncate()', () => {
  it('truncates long strings', () => {
    expect(truncate('Hello, World!', 8)).toBe('Hello...');
  });

  it('leaves short strings unchanged', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  it('handles exact length', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });
});

describe('webinarRegistrationSchema', () => {
  it('validates complete registration data', () => {
    const data = {
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      agreeToTerms: true,
    };
    const result = webinarRegistrationSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('rejects missing required fields', () => {
    const data = {
      email: 'user@example.com',
    };
    const result = webinarRegistrationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('rejects if terms not agreed', () => {
    const data = {
      email: 'user@example.com',
      firstName: 'John',
      lastName: 'Doe',
      agreeToTerms: false,
    };
    const result = webinarRegistrationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
