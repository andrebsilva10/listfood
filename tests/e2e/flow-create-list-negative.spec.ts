import { test, expect } from '@playwright/test';

test.describe('Fluxo negativo - criar lista de compras', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081/');
    await page.getByText('Nova Lista').click();
  });

  test('não permite criar lista sem nome', async ({ page }) => {
    await page.getByText('Salvar').click();
    await expect(page.getByText('Nome da lista é obrigatório')).toBeVisible();
    await expect(page).toHaveURL(/form-list$/);
  });

  test('não permite criar lista com espaços em vez de nome', async ({
    page,
  }) => {
    await page.getByPlaceholder('Ex: Compras do mês').fill('   ');
    await page.getByPlaceholder('0.00').fill('50');
    await page.getByText('Salvar').click();
    await expect(page.getByText('Nome da lista é obrigatório')).toBeVisible();
    await expect(page).toHaveURL(/form-list$/);
  });

  test('permite criar lista válida após erro', async ({ page }) => {
    await page.getByPlaceholder('Ex: Compras do mês').fill('Planejamento');
    await page.getByPlaceholder('0.00').fill('200');
    await page.getByText('Salvar').click();

    await expect(page).toHaveURL(/\/home$/);
    await expect(page.getByText('Planejamento')).toBeVisible();
  });
});
