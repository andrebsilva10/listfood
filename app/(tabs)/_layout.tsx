import { Tabs } from 'expo-router';
import { Home, ShoppingCart } from 'lucide-react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00B7C6',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#00B7C6',
        },
        headerTintColor: '#fff',
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
