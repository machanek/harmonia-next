import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      // Primary colors
      primary: '#1F3D32',
      primaryDark: '#15342a',
      primaryLight: '#2a4d3f',
      
      // Text colors
      textDark: '#2C2C2C',
      textLight: '#6B7280',
      textWhite: '#FFFFFF',
      
      // Background colors
      background: '#FFFFFF',
      backgroundLight: '#F9FAFB',
      backgroundDark: '#F3F4F6',
      
      // Border colors
      border: '#E5E5E5',
      borderLight: '#F3F4F6',
      borderDark: '#D1D5DB',
      
      // Status colors
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      12: '48px',
      16: '64px',
      20: '80px',
      24: '96px',
    },
    sizes: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      12: '48px',
      16: '64px',
      20: '80px',
      24: '96px',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '18px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '48px',
      12: '64px',
    },
    fontWeights: {
      1: '400',
      2: '500',
      3: '600',
      4: '700',
      5: '800',
    },
    lineHeights: {
      1: '1',
      2: '1.2',
      3: '1.4',
      4: '1.5',
      5: '1.6',
      6: '1.8',
      7: '2',
    },
    fonts: {
      primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
      heading: 'Manrope, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    },
    radii: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '12px',
      5: '16px',
      6: '20px',
      round: '50%',
    },
    shadows: {
      1: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      2: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      3: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      4: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      5: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      5: '500',
      max: '999',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
  },
  utils: {
    // Margin utilities
    m: (value: any) => ({
      margin: value,
    }),
    mt: (value: any) => ({
      marginTop: value,
    }),
    mr: (value: any) => ({
      marginRight: value,
    }),
    mb: (value: any) => ({
      marginBottom: value,
    }),
    ml: (value: any) => ({
      marginLeft: value,
    }),
    mx: (value: any) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: any) => ({
      marginTop: value,
      marginBottom: value,
    }),
    
    // Padding utilities
    p: (value: any) => ({
      padding: value,
    }),
    pt: (value: any) => ({
      paddingTop: value,
    }),
    pr: (value: any) => ({
      paddingRight: value,
    }),
    pb: (value: any) => ({
      paddingBottom: value,
    }),
    pl: (value: any) => ({
      paddingLeft: value,
    }),
    px: (value: any) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: any) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    
    // Size utilities
    size: (value: any) => ({
      width: value,
      height: value,
    }),
    
    // Background utilities
    bg: (value: any) => ({
      backgroundColor: value,
    }),
    
    // Color utilities
    color: (value: any) => ({
      color: value,
    }),
  },
});
