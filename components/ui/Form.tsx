import React from 'react';
import { styled } from '@/lib/stitches.config';

// Form Container
export const Form = styled('form', {
  maxWidth: '800px',
  margin: '0 auto',
});

// Form Row
export const FormRow = styled('div', {
  display: 'flex',
  gap: '$5',
  marginBottom: '$5',
  
  variants: {
    direction: {
      column: {
        flexDirection: 'column',
        gap: '$4',
      },
    },
  },
});

// Form Group
export const FormGroup = styled('div', {
  flex: 1,
  
  variants: {
    fullWidth: {
      true: {
        flex: '1 1 100%',
      },
    },
  },
});

// Label
export const FormLabel = styled('label', {
  display: 'block',
  marginBottom: '$2',
  fontWeight: '$2',
  color: '$textDark',
  fontSize: '$3',
  cursor: 'pointer',
});

// Base Input Styles
const baseInputStyles = {
  width: '100%',
  padding: '$3 $4',
  border: '1px solid $border',
  borderRadius: '$3',
  fontSize: '$3',
  fontFamily: '$primary',
  transition: 'all 0.3s ease',
  backgroundColor: '$background',
  
  '&:focus': {
    outline: 'none',
    borderColor: '$primary',
    boxShadow: '0 0 0 3px rgba(31, 61, 50, 0.1)',
  },
  
  '&::placeholder': {
    color: '$textLight',
  },
};

// Input
export const FormInput = styled('input', {
  ...baseInputStyles,
});

// Select
export const FormSelect = styled('select', {
  ...baseInputStyles,
  cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: 'right $3 center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '16px 12px',
  paddingRight: '$10',
  appearance: 'none',
});

// Textarea
export const FormTextarea = styled('textarea', {
  ...baseInputStyles,
  resize: 'vertical',
  minHeight: '120px',
  fontFamily: '$primary',
});

// Checkbox Container
export const CheckboxGroup = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '$3',
});

// Checkbox
export const FormCheckbox = styled('input', {
  width: 'auto',
  margin: 0,
  flexShrink: 0,
  marginTop: '2px',
  cursor: 'pointer',
});

// Checkbox Label
export const CheckboxLabel = styled('label', {
  margin: 0,
  fontSize: '$2',
  lineHeight: '$5',
  cursor: 'pointer',
  color: '$textDark',
});

// Form Actions
export const FormActions = styled('div', {
  marginTop: '$8',
  textAlign: 'center',
});

// Submit Button
export const FormSubmitButton = styled('button', {
  display: 'inline-block',
  padding: '$4 $8',
  backgroundColor: '$primary',
  color: '$textWhite',
  textDecoration: 'none',
  border: 'none',
  borderRadius: '$3',
  fontSize: '$3',
  fontWeight: '$3',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  fontFamily: '$primary',
  
  '&:hover': {
    backgroundColor: '$primaryDark',
    transform: 'translateY(-2px)',
    boxShadow: '$4',
  },
  
  '&:active': {
    transform: 'translateY(0)',
  },
  
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none',
  },
  
  variants: {
    fullWidth: {
      true: {
        width: '100%',
        padding: '$3 $6',
      },
    },
  },
});

// Hidden field
export const HiddenField = styled('p', {
  display: 'none',
});

// Form Error
export const FormError = styled('span', {
  display: 'block',
  marginTop: '$1',
  fontSize: '$1',
  color: '$error',
});

// Form Success
export const FormSuccess = styled('div', {
  padding: '$4',
  backgroundColor: '$success',
  color: '$textWhite',
  borderRadius: '$3',
  marginBottom: '$4',
  textAlign: 'center',
});
