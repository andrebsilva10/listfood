import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ListItem } from '@/components/ListItem';

describe('ListItem', () => {
  it('chama onPress ao pressionar o container do item via testID', () => {
    const onPressMock = jest.fn();
    const onOptionsMock = jest.fn();

    const { getByText, getByTestId } = render(
      <ListItem
        title="Minha Lista"
        subtitle="5 itens"
        onPress={onPressMock}
        onOptions={onOptionsMock}
      />
    );

    const container = getByTestId('listitem-container');
    fireEvent.press(container);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('chama onOptions ao clicar no botão de opções via testID', () => {
    const onPressMock = jest.fn();
    const onOptionsMock = jest.fn();

    const { getByRole, getByTestId } = render(
      <ListItem
        title="Lista de Compras"
        subtitle="10 produtos"
        onPress={onPressMock}
        onOptions={onOptionsMock}
      />
    );

    const optionsBtn = getByTestId('listitem-options-button');
    fireEvent.press(optionsBtn);
    expect(onOptionsMock).toHaveBeenCalled();
  });

  it('não chama onPress ao clicar no botão de opções (stopPropagation)', () => {
    const onPressMock = jest.fn();
    const onOptionsMock = jest.fn();
    const { getByTestId } = render(
      <ListItem title="Teste" onPress={onPressMock} onOptions={onOptionsMock} />
    );
    fireEvent.press(getByTestId('listitem-options-button'));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
