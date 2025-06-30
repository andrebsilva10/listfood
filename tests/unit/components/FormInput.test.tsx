import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormInput } from '@/components/FormInput';

describe('FormInput', () => {
  it('renderiza label e input corretamente', () => {
    const { getByText, getByPlaceholderText } = render(
      <FormInput label="Nome" placeholder="Digite seu nome" />
    );

    expect(getByText('Nome')).toBeTruthy();
    expect(getByPlaceholderText('Digite seu nome')).toBeTruthy();
  });

  it('exibe erro quando prop `error` é passada', () => {
    const { getByText } = render(
      <FormInput label="Email" error="Campo obrigatório" />
    );

    expect(getByText('Campo obrigatório')).toBeTruthy();
  });
});
