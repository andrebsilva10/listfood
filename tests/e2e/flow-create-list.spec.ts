import { test, expect } from '@playwright/test';

test('cria uma nova lista de compras', async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await page.getByText('Nova Lista').click();
  await page.getByPlaceholder('Ex: Compras do mês').fill('Teste E2E');
  await page.getByPlaceholder('0.00').fill('100');
  await page.getByText('Salvar').click();
  await expect(page.getByText('Teste E2E')).toBeVisible();
});
