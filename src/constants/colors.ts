export const colors = {
  // Primary Pink Scale
  pink: {
    50: '#FFF5F7',
    100: '#FFEEF2',
    200: '#FFD6E0',
    300: '#FFB8CA',
    400: '#FF8FA7',
    500: '#FF6B8A',
    600: '#E84C6F',
    700: '#C93657',
    800: '#A62343',
    900: '#7D1530',
  },

  // Cycle-specific colors
  cycle: {
    period: '#E84C6F',
    periodLight: '#FFDCE4',
    fertile: '#A7D8A0',
    fertileLight: '#E8F5E6',
    ovulation: '#7CC576',
    predicted: '#FFB8CA',
    today: '#FF6B8A',
  },

  // Neutral Scale
  neutral: {
    white: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    black: '#000000',
  },
} as const;

export const theme = {
  colors,

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    display: 40,
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;
