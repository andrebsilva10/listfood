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

    act(() => {
      result.current.addList({ name: 'Grátis', initialBalance: 0 });
    });
    expect(result.current.lists).toHaveLength(2);
    expect(result.current.lists[1].initialBalance).toBe(0);
  });

  it('não adiciona lista sem nome ou nome vazio', () => {
    const wrapper = ({ children }: any) => (
      <ShoppingListProvider>{children}</ShoppingListProvider>
    );
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    act(() => {
      result.current.addList({ name: '', initialBalance: 100 });
    });
    expect(result.current.lists).toHaveLength(0);
  });

  it('adiciona e remove produtos corretamente para múltiplas listas', () => {
    const wrapper = ({ children }: any) => (
      <ShoppingListProvider>{children}</ShoppingListProvider>
    );
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    act(() => {
      result.current.addList({ name: 'L1', initialBalance: 50 });
      result.current.addList({ name: 'L2', initialBalance: 100 });
    });
    const [l1, l2] = result.current.lists;
    act(() => {
      result.current.addProduct(l1.id, {
        name: 'P1',
        unitPrice: 10,
        quantity: 1,
      });
      result.current.addProduct(l2.id, {
        name: 'P2',
        unitPrice: 20,
        quantity: 2,
      });
    });
    expect(
      result.current.getProductById(
        l1.id,
        result.current.lists[0].products[0].id
      )
    ).toBeDefined();
    expect(
      result.current.getProductById(
        l2.id,
        result.current.lists[1].products[0].id
      )
    ).toBeDefined();
    const p1Id = result.current.lists[0].products[0].id;
    act(() => {
      result.current.removeProduct(l1.id, p1Id);
    });
    expect(result.current.getProductById(l1.id, p1Id)).toBeUndefined();
  });
});
