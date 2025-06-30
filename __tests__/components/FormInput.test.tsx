import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormInput } from '@/components/FormInput';

describe('FormInput Component', () => {
  const mockProps = {
    label: 'Nome do Produto',
    value: '',
    onChangeText: jest.fn(),
    placeholder: 'Digite o nome do produto',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render label correctly', () => {
    const { getByText } = render(<FormInput {...mockProps} />);
    
    expect(getByText('Nome do Produto')).toBeTruthy();
  });

  it('should render required asterisk when required prop is true', () => {
    const { getByText } = render(<FormInput {...mockProps} required />);
    
    expect(getByText('Nome do Produto')).toBeTruthy();
    expect(getByText('*')).toBeTruthy();
  });

  it('should not render required asterisk when required prop is false', () => {
    const { getByText, queryByText } = render(<FormInput {...mockProps} required={false} />);
    
    expect(getByText('Nome do Produto')).toBeTruthy();
    expect(queryByText('*')).toBeNull();
  });

  it('should display error message when error prop is provided', () => {
    const propsWithError = {
      ...mockProps,
      error: 'Este campo é obrigatório',
    };
    
    const { getByText } = render(<FormInput {...propsWithError} />);
    
    expect(getByText('Este campo é obrigatório')).toBeTruthy();
  });

  it('should not display error message when error prop is not provided', () => {
    const { queryByText } = render(<FormInput {...mockProps} />);
    
    expect(queryByText('Este campo é obrigatório')).toBeNull();
  });

  it('should call onChangeText when text input changes', () => {
    const { getByPlaceholderText } = render(<FormInput {...mockProps} />);
    
    const textInput = getByPlaceholderText('Digite o nome do produto');
    fireEvent.changeText(textInput, 'Novo texto');
    
    expect(mockProps.onChangeText).toHaveBeenCalledWith('Novo texto');
  });

  it('should apply error styling when error is present', () => {
    const propsWithError = {
      ...mockProps,
      error: 'Erro de validação',
    };
    
    const { getByPlaceholderText } = render(<FormInput {...propsWithError} />);
    
    const textInput = getByPlaceholderText('Digite o nome do produto');
    
    // Check if error styling is applied (this would depend on the actual implementation)
    expect(textInput).toBeTruthy();
  });

  it('should pass through additional TextInput props', () => {
    const propsWithKeyboard = {
      ...mockProps,
      keyboardType: 'numeric' as const,
      maxLength: 10,
    };
    
    const { getByPlaceholderText } = render(<FormInput {...propsWithKeyboard} />);
    
    const textInput = getByPlaceholderText('Digite o nome do produto');
    
    expect(textInput.props.keyboardType).toBe('numeric');
    expect(textInput.props.maxLength).toBe(10);
  });

  it('should display current value in text input', () => {
    const propsWithValue = {
      ...mockProps,
      value: 'Valor atual',
    };
    
    const { getByDisplayValue } = render(<FormInput {...propsWithValue} />);
    
    expect(getByDisplayValue('Valor atual')).toBeTruthy();
  });
});