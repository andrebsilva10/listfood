import '@testing-library/jest-native';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeOnTheScreen(): R;
      toHaveDisplayValue(value: string | RegExp | (string | RegExp)[]): R;
      toHaveTextContent(text: string | RegExp | (string | RegExp)[]): R;
      toHaveProp(prop: string, value?: any): R;
      toHaveStyle(style: object | object[]): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeEmpty(): R;
      toBeVisible(): R;
      toBeBusy(): R;
      toBeChecked(): R;
      toBeCollapsed(): R;
      toBeExpanded(): R;
      toBePartiallyChecked(): R;
      toBeSelected(): R;
    }
  }
}