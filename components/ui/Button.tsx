import React from 'react';
import { styled } from '@/lib/stitches.config';

const StyledButton = styled('button', {
  // Base styles
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  border: 'none',
  borderRadius: '$3',
  fontFamily: '$primary',
  fontWeight: '$2',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  whiteSpace: 'nowrap',
  
  // Variants
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$textWhite',
        '&:hover': {
          backgroundColor: '$primaryDark',
          transform: 'translateY(-1px)',
          boxShadow: '$3',
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '$primary',
        border: '2px solid $primary',
        '&:hover': {
          backgroundColor: '$primary',
          color: '$textWhite',
          transform: 'scale(1.05)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$textDark',
        '&:hover': {
          color: '$primary',
        },
      },
    },
    size: {
      sm: {
        padding: '$2 $3',
        fontSize: '$1',
        minHeight: '$8',
      },
      md: {
        padding: '$3 $4',
        fontSize: '$2',
        minHeight: '$10',
      },
      lg: {
        padding: '$4 $6',
        fontSize: '$3',
        minHeight: '$12',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
  
  // Default variants
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} {...props}>
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';

// Link variant for navigation
export const ButtonLink = styled('a', {
  // Base styles
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  border: 'none',
  borderRadius: '$3',
  fontFamily: '$primary',
  fontWeight: '$2',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  whiteSpace: 'nowrap',
  
  // Variants
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$textWhite',
        '&:hover': {
          backgroundColor: '$primaryDark',
          transform: 'translateY(-1px)',
          boxShadow: '$3',
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '$primary',
        border: '2px solid $primary',
        '&:hover': {
          backgroundColor: '$primary',
          color: '$textWhite',
          transform: 'scale(1.05)',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$textDark',
        '&:hover': {
          color: '$primary',
        },
      },
    },
    size: {
      sm: {
        padding: '$2 $3',
        fontSize: '$1',
        minHeight: '$8',
      },
      md: {
        padding: '$3 $4',
        fontSize: '$2',
        minHeight: '$10',
      },
      lg: {
        padding: '$4 $6',
        fontSize: '$3',
        minHeight: '$12',
      },
    },
  },
  
  // Default variants
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
