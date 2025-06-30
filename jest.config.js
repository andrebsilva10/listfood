export const preset = 'jest-expo';
export const setupFilesAfterEnv = [
  '@testing-library/jest-native/extend-expect',
];
export const testPathIgnorePatterns = ['/node_modules/', '/e2e/'];
export const transform = {
  '^.+\\.[tj]sx?$': 'babel-jest',
};
export const transformIgnorePatterns = [
  'node_modules/(?!(expo|expo-modules-core|react-native|@react-native|@react-navigation|@testing-library/react-native|@testing-library/react-hooks)/)',
];
export const moduleNameMapper = {
  '^expo/src/winter/.*$': '<rootDir>/__mocks__/expo/src/winter/index.js',
};
