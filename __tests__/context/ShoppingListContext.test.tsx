import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { ShoppingListProvider, useShoppingList } from '@/context/ShoppingListContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ShoppingListProvider>{children}</ShoppingListProvider>
);

describe('ShoppingListContext', () => {
  it('should initialize with empty lists array', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    expect(result.current.lists).toEqual([]);
  });

  it('should add a new list correctly', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    const newListData = {
      name: 'Lista de Compras',
      initialBalance: 100,
    };
    
    act(() => {
      result.current.addList(newListData);
    });
    
    expect(result.current.lists).toHaveLength(1);
    expect(result.current.lists[0]).toMatchObject({
      name: 'Lista de Compras',
      initialBalance: 100,
      products: [],
    });
    expect(result.current.lists[0].id).toBeDefined();
  });

  it('should update an existing list correctly', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    // Add a list first
    act(() => {
      result.current.addList({ name: 'Lista Original', initialBalance: 50 });
    });
    
    const listId = result.current.lists[0].id;
    
    // Update the list
    act(() => {
      result.current.updateList(listId, { name: 'Lista Atualizada', initialBalance: 150 });
    });
    
    expect(result.current.lists[0]).toMatchObject({
      name: 'Lista Atualizada',
      initialBalance: 150,
    });
  });

  it('should remove a list correctly', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    // Add two lists
    act(() => {
      result.current.addList({ name: 'Lista 1', initialBalance: 100 });
      result.current.addList({ name: 'Lista 2', initialBalance: 200 });
    });
    
    expect(result.current.lists).toHaveLength(2);
    
    const firstListId = result.current.lists[0].id;
    
    // Remove the first list
    act(() => {
      result.current.removeList(firstListId);
    });
    
    expect(result.current.lists).toHaveLength(1);
    expect(result.current.lists[0].name).toBe('Lista 2');
  });

  it('should get list by id correctly', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    act(() => {
      result.current.addList({ name: 'Lista Teste', initialBalance: 75 });
    });
    
    const listId = result.current.lists[0].id;
    const foundList = result.current.getListById(listId);
    
    expect(foundList).toMatchObject({
      name: 'Lista Teste',
      initialBalance: 75,
    });
  });

  it('should return undefined when getting non-existent list', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    const foundList = result.current.getListById('non-existent-id');
    
    expect(foundList).toBeUndefined();
  });

  it('should add product to list correctly', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    // Add a list first
    act(() => {
      result.current.addList({ name: 'Lista com Produtos', initialBalance: 100 });
    });
    
    const listId = result.current.lists[0].id;
    
    // Add a product
    act(() => {
      result.current.addProduct(listId, {
        name: 'Arroz',
        unitPrice: 5.99,
        quantity: 2,
      });
    });
    
    expect(result.current.lists[0].products).toHaveLength(1);
    expect(result.current.lists[0].products[0]).toMatchObject({
      name: 'Arroz',
      unitPrice: 5.99,
      quantity: 2,
    });
    expect(result.current.lists[0].products[0].id).toBeDefined();
  });

  it('should update product correctly', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    // Add list and product
    act(() => {
      result.current.addList({ name: 'Lista', initialBalance: 100 });
    });
    
    const listId = result.current.lists[0].id;
    
    act(() => {
      result.current.addProduct(listId, {
        name: 'Feijão',
        unitPrice: 3.50,
        quantity: 1,
      });
    });
    
    const productId = result.current.lists[0].products[0].id;
    
    // Update the product
    act(() => {
      result.current.updateProduct(listId, productId, {
        name: 'Feijão Preto',
        unitPrice: 4.00,
        quantity: 3,
      });
    });
    
    expect(result.current.lists[0].products[0]).toMatchObject({
      name: 'Feijão Preto',
      unitPrice: 4.00,
      quantity: 3,
    });
  });

  it('should remove product correctly', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    // Add list and two products
    act(() => {
      result.current.addList({ name: 'Lista', initialBalance: 100 });
    });
    
    const listId = result.current.lists[0].id;
    
    act(() => {
      result.current.addProduct(listId, { name: 'Produto 1', unitPrice: 10, quantity: 1 });
      result.current.addProduct(listId, { name: 'Produto 2', unitPrice: 20, quantity: 1 });
    });
    
    expect(result.current.lists[0].products).toHaveLength(2);
    
    const firstProductId = result.current.lists[0].products[0].id;
    
    // Remove first product
    act(() => {
      result.current.removeProduct(listId, firstProductId);
    });
    
    expect(result.current.lists[0].products).toHaveLength(1);
    expect(result.current.lists[0].products[0].name).toBe('Produto 2');
  });

  it('should get product by id correctly', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    // Add list and product
    act(() => {
      result.current.addList({ name: 'Lista', initialBalance: 100 });
    });
    
    const listId = result.current.lists[0].id;
    
    act(() => {
      result.current.addProduct(listId, {
        name: 'Macarrão',
        unitPrice: 2.50,
        quantity: 4,
      });
    });
    
    const productId = result.current.lists[0].products[0].id;
    const foundProduct = result.current.getProductById(listId, productId);
    
    expect(foundProduct).toMatchObject({
      name: 'Macarrão',
      unitPrice: 2.50,
      quantity: 4,
    });
  });

  it('should return undefined when getting product from non-existent list', () => {
    const { result } = renderHook(() => useShoppingList(), { wrapper });
    
    const foundProduct = result.current.getProductById('non-existent-list', 'some-product-id');
    
    expect(foundProduct).toBeUndefined();
  });

  it('should throw error when used outside provider', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      renderHook(() => useShoppingList());
    }).toThrow('useShoppingList deve ser usado dentro de um ShoppingListProvider');
    
    consoleErrorSpy.mockRestore();
  });
});