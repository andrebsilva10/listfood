import { test, expect } from '@playwright/test';

test('adiciona produto em uma lista', async ({ page }) => {
  await page.goto('http://localhost:8081/');

  const listaExiste = await page.locator('text=Teste E2E').count();
  if (listaExiste === 0) {
    await page.getByText('Nova Lista').click();
    await page.getByPlaceholder('Ex: Compras do mês').fill('Teste E2E');
    await page.getByPlaceholder('0.00').fill('100');
    await page.getByText('Salvar').click();
    await expect(page.getByText('Teste E2E')).toBeVisible();
  }

  await page.getByText('Teste E2E').click();
  await page.getByText('Adicionar Produto').click();
  await page.getByPlaceholder('Ex: Arroz').fill('Feijão');
  await page.getByPlaceholder('0.00').fill('10');
  await page.getByPlaceholder('1').fill('2');
  await page.getByText('Salvar').click();
  await expect(page.getByText('Feijão')).toBeVisible();
});
