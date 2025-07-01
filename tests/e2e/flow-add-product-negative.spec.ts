import { test, expect } from '@playwright/test';

test.describe('Fluxo negativo - adicionar produto', () => {
  test.beforeEach(async ({ page }) => {
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
  });

  test('não permite salvar sem preencher campos obrigatórios', async ({
    page,
  }) => {
    await page.getByText('Salvar').click();
    await expect(page.getByText('Nome do produto é obrigatório')).toBeVisible();
    await expect(page.getByText('Preço unitário é obrigatório')).toBeVisible();
    await expect(page.getByText('Quantidade é obrigatória')).toBeVisible();
    await expect(page).toHaveURL(/form-product(\?|$)/);
  });

  test('não permite nome com apenas espaços', async ({ page }) => {
    await page.getByPlaceholder('Ex: Arroz').fill('   ');
    await page.getByPlaceholder('0.00').fill('10');
    await page.getByPlaceholder('1').fill('2');
    await page.getByText('Salvar').click();
    await expect(page.getByText('Nome do produto é obrigatório')).toBeVisible();
    await expect(page).toHaveURL(/form-product(\?|$)/);
  });

  test('permite adicionar produto válido após correção', async ({ page }) => {
    await page.getByPlaceholder('Ex: Arroz').fill('Arroz');
    await page.getByPlaceholder('0.00').fill('5');
    await page.getByPlaceholder('1').fill('3');
    await page.getByText('Salvar').click();
    await expect(page).toHaveURL(/detail\?id=/);
    await expect(page.getByText('Arroz')).toBeVisible();
  });
});
