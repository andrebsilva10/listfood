import '@testing-library/jest-native/extend-expect';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  
  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  
  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  router: {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  },
}));

// Mock lucide-react-native icons
jest.mock('lucide-react-native', () => ({
  Home: 'Home',
  ShoppingCart: 'ShoppingCart',
  Plus: 'Plus',
  EllipsisVertical: 'EllipsisVertical',
  ChevronRight: 'ChevronRight',
  CircleAlert: 'CircleAlert',
  LogOut: 'LogOut',
  CreditCard: 'CreditCard',
}));

// Mock AsyncStorageHelper
jest.mock('@/helpers/AsyncStorageHelper', () => ({
  __esModule: true,
  default: {
    getString: jest.fn(),
    setString: jest.fn(),
    removeItem: jest.fn(),
    setNumber: jest.fn(),
    getNumber: jest.fn(),
    setBoolean: jest.fn(),
    getBoolean: jest.fn(),
    setObject: jest.fn(),
    getObject: jest.fn(),
  },
}));

// Global test utilities
declare global {
  var getByText: any;
  var queryByText: any;
  var getByTestId: any;
  var getByPlaceholderText: any;
  var getByDisplayValue: any;
  var getByRole: any;
  var fireEvent: any;
}