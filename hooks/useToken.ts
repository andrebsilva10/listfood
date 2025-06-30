import { useState, useEffect, useRef } from 'react';
import AsyncStorageHelper from '@/helpers/AsyncStorageHelper';

const TOKEN_KEY = '@listfood:token';

export function useToken() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {

    isMounted.current = true;

    const loadToken = async () => {
      try {
        if (!isMounted.current) return;

        const savedToken = await AsyncStorageHelper.getString(TOKEN_KEY);

        if (isMounted.current) {
          setToken(savedToken);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao carregar token:', error);
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    loadToken();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const saveToken = async (newToken: string) => {
    await AsyncStorageHelper.setString(TOKEN_KEY, newToken);
    if (isMounted.current) {
      setToken(newToken);
    }
  };

  const removeToken = async () => {
    await AsyncStorageHelper.removeItem(TOKEN_KEY);
    if (isMounted.current) {
      setToken(null);
    }
  };

  return {
    token,
    isLoading,
    saveToken,
    removeToken,
  };
}
