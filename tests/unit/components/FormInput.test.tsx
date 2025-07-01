import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormInput } from '@/components/FormInput';

describe('FormInput', () => {
  it('renderiza label e input corretamente usando testID', () => {
    const { getByText, getByTestId } = render(
      <FormInput label="Nome" placeholder="Digite seu nome" />
    );
    expect(getByText('Nome')).toBeTruthy();
    const input = getByTestId('forminput-nome');
    expect(input).toBeTruthy();
  });

  it('exibe mensagem de erro e style apropriado pelo testID', () => {
    const { getByTestId } = render(
      <FormInput label="Email" placeholder="Email" error="Inválido" />
    );
    const errorText = getByTestId('forminput-error-email');
    expect(errorText.props.children).toBe('Inválido');
    const input = getByTestId('forminput-email');
    const styleArray = Array.isArray(input.props.style)
      ? input.props.style
      : [input.props.style];
    expect(styleArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ borderColor: '#D32F2F' }),
      ])
    );
  });

  it('marca como obrigatório quando required=true', () => {
    const { getByText } = render(
      <FormInput label="Senha" placeholder="Senha" required />
    );
    const asterisk = getByText('*');
    expect(asterisk).toBeTruthy();
  });

  it('chama onChangeText ao digitar no input via testID', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <FormInput
        label="Usuário"
        placeholder="Usuário"
        onChangeText={onChange}
      />
    );
    const input = getByTestId('forminput-usuário');
    fireEvent.changeText(input, 'novoValor');
    expect(onChange).toHaveBeenCalledWith('novoValor');
  });
});
