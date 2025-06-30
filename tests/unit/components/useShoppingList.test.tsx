import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import {
  ShoppingListProvider,
  useShoppingList,
} from '@/context/ShoppingListContext';

describe('useShoppingList', () => {
  it('adiciona uma nova lista corretamente', () => {
    const wrapper = ({ children }: any) => (
      <ShoppingListProvider>{children}</ShoppingListProvider>
    );

    const { result } = renderHook(() => useShoppingList(), { wrapper });

    act(() => {
      result.current.addList({ name: 'Supermercado', initialBalance: 200 });
    });

    expect(result.current.lists.length).toBe(1);
    expect(result.current.lists[0].name).toBe('Supermercado');
    expect(result.current.lists[0].initialBalance).toBe(200);
    expect(result.current.lists[0].products).toEqual([]);
  });
});
