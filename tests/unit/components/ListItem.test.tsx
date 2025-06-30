import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListItem } from '@/components/ListItem';

describe('ListItem', () => {
  it('chama onPress ao ser pressionado', () => {
    const onPressMock = jest.fn();
    const onOptionsMock = jest.fn();

    const { getByText } = render(
      <ListItem
        title="Minha Lista"
        subtitle="5 itens"
        onPress={onPressMock}
        onOptions={onOptionsMock}
      />
    );

    fireEvent.press(getByText('Minha Lista'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('chama onOptions ao clicar no botão de opções', () => {
    const onPressMock = jest.fn();
    const onOptionsMock = jest.fn();

    const { getByRole } = render(
      <ListItem
        title="Lista de Compras"
        subtitle="10 produtos"
        onPress={onPressMock}
        onOptions={onOptionsMock}
      />
    );

    fireEvent.press(getByRole('button'));
    expect(onOptionsMock).toHaveBeenCalled();
  });
});
