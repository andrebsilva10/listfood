import { ShoppingList } from '@/context/ShoppingListContext';

export const mockShoppingLists: ShoppingList[] = [
  {
    id: '1',
    name: 'Compras do Supermercado',
    initialBalance: 200.00,
    products: [
      {
        id: '1',
        name: 'Arroz',
        unitPrice: 5.50,
        quantity: 2,
      },
      {
        id: '2',
        name: 'Feijão',
        unitPrice: 4.20,
        quantity: 1,
      },
      {
        id: '3',
        name: 'Leite',
        unitPrice: 3.80,
        quantity: 3,
      },
    ],
  },
  {
    id: '2',
    name: 'Lista da Semana',
    initialBalance: 150.00,
    products: [
      {
        id: '4',
        name: 'Pão',
        unitPrice: 2.50,
        quantity: 2,
      },
      {
        id: '5',
        name: 'Banana',
        unitPrice: 3.90,
        quantity: 1,
      },
    ],
  },
];
