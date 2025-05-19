import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ShoppingListProvider } from '@/context/ShoppingListContext';

export default function RootLayout() {
  return (
    <ShoppingListProvider>
      <>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#00B7C6' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="form-list"
            options={{ title: 'Nova Lista', presentation: 'modal' }}
          />
          <Stack.Screen
            name="form-product"
            options={{ title: 'Novo Produto', presentation: 'modal' }}
          />
          <Stack.Screen
            name="detail"
            options={({ route }) => ({
              title: (route?.params as { name?: string })?.name || 'Detalhes da Lista',
            })}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </>
    </ShoppingListProvider>
  );
}
