/**
 * Design tokens for Luna Pictures website
 * Centralized design constants for consistent styling
 */

export const colors = {
  background: {
    primary: '#1B1B1B',
    secondary: '#000000',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A0A0',
  },
  border: {
    primary: '#FFFFFF',
    secondary: '#333333',
  },
} as const;

export const typography = {
  fonts: {
    mono: '"Geist Mono", monospace',
    sans: 'var(--font-geist-sans)',
  },
  sizes: {
    // Base sizes in rem
    menu: {
      mobile: '0.75rem', // 12px
      tablet: '0.875rem', // 14px
      desktop: '0.875rem', // 14px
    },
    heading: {
      mobile: '2.5rem', // 40px
      tablet: '3.5rem', // 56px
      desktop: '4.5rem', // 72px
    },
    subtitle: {
      mobile: '0.875rem', // 14px
      tablet: '1rem', // 16px
      desktop: '1.125rem', // 18px
    },
    button: {
      mobile: '0.875rem', // 14px
      tablet: '1rem', // 16px
      desktop: '1rem', // 16px
    },
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  letterSpacing: {
    tight: '-0.07px',
    normal: '0',
  },
} as const;

export const spacing = {
  section: {
    mobile: '4rem', // 64px
    tablet: '6rem', // 96px
    desktop: '8rem', // 128px
  },
  container: {
    mobile: '1.5rem', // 24px
    tablet: '2rem', // 32px
    desktop: '3rem', // 48px
  },
} as const;

export const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;
