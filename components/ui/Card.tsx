import React from 'react';
import { styled } from '@/lib/stitches.config';

const StyledCard = styled('div', {
  backgroundColor: '$background',
  borderRadius: '$4',
  border: '1px solid $border',
  boxShadow: '$2',
  overflow: 'hidden',
  
  variants: {
    variant: {
      default: {
        backgroundColor: '$background',
      },
      elevated: {
        backgroundColor: '$background',
        boxShadow: '$4',
      },
      outlined: {
        backgroundColor: 'transparent',
        border: '2px solid $border',
        boxShadow: 'none',
      },
    },
    padding: {
      none: {
        padding: 0,
      },
      sm: {
        padding: '$4',
      },
      md: {
        padding: '$6',
      },
      lg: {
        padding: '$8',
      },
    },
  },
  
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledCard ref={ref} {...props}>
        {children}
      </StyledCard>
    );
  }
);

Card.displayName = 'Card';

// Card sub-components
export const CardHeader = styled('div', {
  padding: '$6 $6 $4 $6',
  
  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: '$4 $4 $2 $4' },
      md: { padding: '$6 $6 $4 $6' },
      lg: { padding: '$8 $8 $6 $8' },
    },
  },
  
  defaultVariants: {
    padding: 'md',
  },
});

export const CardContent = styled('div', {
  padding: '$4 $6',
  
  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: '$2 $4' },
      md: { padding: '$4 $6' },
      lg: { padding: '$6 $8' },
    },
  },
  
  defaultVariants: {
    padding: 'md',
  },
});

export const CardFooter = styled('div', {
  padding: '$4 $6 $6 $6',
  
  variants: {
    padding: {
      none: { padding: 0 },
      sm: { padding: '$2 $4 $4 $4' },
      md: { padding: '$4 $6 $6 $6' },
      lg: { padding: '$6 $8 $8 $8' },
    },
  },
  
  defaultVariants: {
    padding: 'md',
  },
});
