import { Tabs } from 'expo-router';
import { Home, ShoppingCart } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

export default function TabsLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: theme.tabBarBackground,
          borderTopColor: theme.borderColor,
        },
        headerStyle: {
          backgroundColor: theme.headerBackground,
        },
        headerTintColor: theme.headerText,
        headerRight: () => <ThemeToggleButton />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Listas',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'ListFood',
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
