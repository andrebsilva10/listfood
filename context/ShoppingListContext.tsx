import { createContext, useState, useContext, ReactNode } from 'react';

interface Product {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

interface ShoppingList {
  id: string;
  name: string;
  initialBalance: number;
  products: Product[];
}

interface ShoppingListContextData {
  lists: ShoppingList[];
  addList: (data: Omit<ShoppingList, 'id' | 'products'>) => void;
  updateList: (id: string, data: Omit<ShoppingList, 'id' | 'products'>) => void;
  removeList: (id: string) => void;
  getListById: (id: string) => ShoppingList | undefined;
  addProduct: (listId: string, data: Omit<Product, 'id'>) => void;
  updateProduct: (
    listId: string,
    productId: string,
    data: Omit<Product, 'id'>
  ) => void;
  removeProduct: (listId: string, productId: string) => void;
  getProductById: (listId: string, productId: string) => Product | undefined;
}

const ShoppingListContext = createContext<ShoppingListContextData>(
  {} as ShoppingListContextData
);

export function ShoppingListProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<ShoppingList[]>([]);

  const addList = (data: Omit<ShoppingList, 'id' | 'products'>) => {
    if (!data.name || data.name.trim() === '') return;

    const newList: ShoppingList = {
      id: Date.now().toString(),
      name: data.name,
      initialBalance: data.initialBalance,
      products: [],
    };

    setLists((prevLists) => [...prevLists, newList]);
  };

  const updateList = (
    id: string,
    data: Omit<ShoppingList, 'id' | 'products'>
  ) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === id) {
          return {
            ...list,
            name: data.name,
            initialBalance: data.initialBalance,
          };
        }
        return list;
      })
    );
  };

  const removeList = (id: string) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== id));
  };

  const getListById = (id: string) => {
    return lists.find((list) => list.id === id);
  };

  const addProduct = (listId: string, data: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: data.name,
      unitPrice: data.unitPrice,
      quantity: data.quantity,
    };

    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            products: [...list.products, newProduct],
          };
        }
        return list;
      })
    );
  };

  const updateProduct = (
    listId: string,
    productId: string,
    data: Omit<Product, 'id'>
  ) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            products: list.products.map((product) => {
              if (product.id === productId) {
                return {
                  ...product,
                  name: data.name,
                  unitPrice: data.unitPrice,
                  quantity: data.quantity,
                };
              }
              return product;
            }),
          };
        }
        return list;
      })
    );
  };

  const removeProduct = (listId: string, productId: string) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            products: list.products.filter(
              (product) => product.id !== productId
            ),
          };
        }
        return list;
      })
    );
  };

  const getProductById = (listId: string, productId: string) => {
    const list = lists.find((list) => list.id === listId);
    if (!list) return undefined;
    return list.products.find((product) => product.id === productId);
  };

  return (
    <ShoppingListContext.Provider
      value={{
        lists,
        addList,
        updateList,
        removeList,
        getListById,
        addProduct,
        updateProduct,
        removeProduct,
        getProductById,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);

  if (!context) {
    throw new Error(
      'useShoppingList deve ser usado dentro de um ShoppingListProvider'
    );
  }

  return context;
}
