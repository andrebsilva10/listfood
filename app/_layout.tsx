import { StatusBar } from 'expo-status-bar';
import { ShoppingListProvider } from '@/context/ShoppingListContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ThemedStack } from '@/components/ThemedStack';

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <ThemedStack />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ShoppingListProvider>
        <AppContent />
      </ShoppingListProvider>
    </ThemeProvider>
  );
}
