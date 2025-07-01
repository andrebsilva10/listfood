import { Stack } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

export function ThemedStack() {
  const { theme, isDarkMode } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.headerBackground },
        headerTintColor: theme.headerText,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'slide_from_right',
        headerRight: () => <ThemeToggleButton />,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="form-list"
        options={{
          title: 'Nova Lista',
          presentation: 'modal',
          headerStyle: { backgroundColor: theme.headerBackground },
          headerTintColor: theme.headerText,
        }}
      />
      <Stack.Screen
        name="form-product"
        options={{
          title: 'Novo Produto',
          presentation: 'modal',
          headerStyle: { backgroundColor: theme.headerBackground },
          headerTintColor: theme.headerText,
        }}
      />
      <Stack.Screen
        name="detail"
        options={({ route }) => ({
          title:
            (route?.params as { name?: string })?.name || 'Detalhes da Lista',
          headerStyle: { backgroundColor: theme.headerBackground },
          headerTintColor: theme.headerText,
        })}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
