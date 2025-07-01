import { createContext, useState, useContext, ReactNode } from 'react';

export const lightTheme = {
  primary: '#00B7C6',
  primaryDark: '#008B96',
  secondary: '#FFA726',

  backgroundColor: '#FFFFFF',
  surfaceColor: '#F5F5F5',
  cardBackground: '#FFFFFF',

  textPrimary: '#212121',
  textSecondary: '#757575',
  textTertiary: '#9E9E9E',

  borderColor: '#E0E0E0',
  borderColorFocus: '#00B7C6',

  errorColor: '#D32F2F',
  successColor: '#388E3C',
  warningColor: '#F57C00',

  headerBackground: '#00B7C6',
  headerText: '#FFFFFF',
  tabBarBackground: '#FFFFFF',
  tabBarInactive: '#757575',
  tabBarActive: '#00B7C6',

  shadowColor: '#000000',
  shadowOpacity: 0.1,

  inputBackground: '#FFFFFF',
  placeholderText: '#9E9E9E',
};

export const darkTheme = {
  primary: '#4DD0E1',
  primaryDark: '#26C6DA',
  secondary: '#FFB74D',

  backgroundColor: '#121212',
  surfaceColor: '#1E1E1E',
  cardBackground: '#2D2D2D',

  textPrimary: '#FFFFFF',
  textSecondary: '#B3B3B3',
  textTertiary: '#808080',

  borderColor: '#404040',
  borderColorFocus: '#4DD0E1',

  errorColor: '#F44336',
  successColor: '#4CAF50',
  warningColor: '#FF9800',

  headerBackground: '#1F1F1F',
  headerText: '#FFFFFF',
  tabBarBackground: '#1F1F1F',
  tabBarInactive: '#808080',
  tabBarActive: '#4DD0E1',

  shadowColor: '#000000',
  shadowOpacity: 0.3,

  inputBackground: '#2D2D2D',
  placeholderText: '#808080',
};

export type Theme = typeof lightTheme;

interface ThemeContextData {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }

  return context;
}
