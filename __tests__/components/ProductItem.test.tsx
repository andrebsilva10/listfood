import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductItem } from '@/components/ProductItem';

describe('ProductItem Component', () => {
  const mockProps = {
    name: 'Arroz Integral',
    unitPrice: 5.99,
    quantity: 2,
    subtotal: 11.98,
    onPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product information correctly', () => {
    const { getByText } = render(<ProductItem {...mockProps} />);
    
    expect(getByText('Arroz Integral')).toBeTruthy();
    expect(getByText('R$ 5.99')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('R$ 11.98')).toBeTruthy();
  });

  it('should display labels correctly', () => {
    const { getByText } = render(<ProductItem {...mockProps} />);
    
    expect(getByText('Preço Unit.')).toBeTruthy();
    expect(getByText('Qtd.')).toBeTruthy();
    expect(getByText('Subtotal')).toBeTruthy();
  });

  it('should format prices with two decimal places', () => {
    const propsWithWholeNumbers = {
      ...mockProps,
      unitPrice: 10,
      subtotal: 20,
    };
    
    const { getByText } = render(<ProductItem {...propsWithWholeNumbers} />);
    
    expect(getByText('R$ 10.00')).toBeTruthy();
    expect(getByText('R$ 20.00')).toBeTruthy();
  });

  it('should handle decimal quantities correctly', () => {
    const propsWithDecimalQuantity = {
      ...mockProps,
      quantity: 1.5,
    };
    
    const { getByText } = render(<ProductItem {...propsWithDecimalQuantity} />);
    
    expect(getByText('1.5')).toBeTruthy();
  });

  it('should call onPress when the component is pressed', () => {
    const { getByText } = render(<ProductItem {...mockProps} />);
    
    const nameElement = getByText('Arroz Integral');
    const container = nameElement.parent?.parent;
    
    fireEvent.press(container as any);
    
    expect(mockProps.onPress).toHaveBeenCalledTimes(1);
  });

  it('should truncate long product names', () => {
    const longNameProps = {
      ...mockProps,
      name: 'Arroz Integral Orgânico Premium com Grãos Selecionados e Certificação Internacional de Qualidade',
    };
    
    const { getByText } = render(<ProductItem {...longNameProps} />);
    
    const nameElement = getByText(longNameProps.name);
    expect(nameElement).toBeTruthy();
    expect(nameElement.props.numberOfLines).toBe(1);
  });

  it('should calculate subtotal correctly when props change', () => {
    const { getByText, rerender } = render(<ProductItem {...mockProps} />);
    
    // Initial subtotal
    expect(getByText('R$ 11.98')).toBeTruthy();
    
    // Update props with new calculation
    const updatedProps = {
      ...mockProps,
      quantity: 3,
      subtotal: 17.97, // 5.99 * 3
    };
    
    rerender(<ProductItem {...updatedProps} />);
    
    expect(getByText('3')).toBeTruthy();
    expect(getByText('R$ 17.97')).toBeTruthy();
  });

  it('should handle zero values correctly', () => {
    const zeroProps = {
      ...mockProps,
      unitPrice: 0,
      quantity: 0,
      subtotal: 0,
    };
    
    const { getByText } = render(<ProductItem {...zeroProps} />);
    
    expect(getByText('R$ 0.00')).toBeTruthy();
    expect(getByText('0')).toBeTruthy();
  });
});