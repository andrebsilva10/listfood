import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { ShoppingListProvider } from '@/context/ShoppingListContext';
import { useToken } from '@/hooks/useToken';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'expo-router';

export default function RootLayout() {
  const { token, isLoading } = useToken();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && token === null && pathname !== '/login') {
      router.replace('/login');
    }
  }, [isLoading, token, router, pathname]);

  if (pathname === '/login') {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00B7C6" />
      </View>
    );
  }

  if (!token) {
    return null;
  }

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
              title:
                (route?.params as { name?: string })?.name ||
                'Detalhes da Lista',
            })}
          />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </>
    </ShoppingListProvider>
  );
}
