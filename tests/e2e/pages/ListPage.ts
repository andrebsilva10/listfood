import { Page, expect } from '@playwright/test';

export class ListPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('http://localhost:8081/');
  }

  async createNewList(name: string, balance: string) {
    await this.page.getByRole('button', { name: 'Nova Lista' }).click();
    await this.page.getByPlaceholder('Ex: Compras do mês').fill(name);
    await this.page.getByPlaceholder('0.00').fill(balance);
    await this.page.getByText('Salvar').click();
  }

  async openForm() {
    await this.page.getByRole('button', { name: 'Nova Lista' }).click();
  }

  async saveForm() {
    await this.page.getByRole('button', { name: 'Salvar' }).click();
  }

  async fillName(name: string) {
    await this.page.getByPlaceholder('Ex: Compras do mês').fill(name);
  }

  async fillBalance(balance: string) {
    await this.page.getByPlaceholder('0.00').fill(balance);
  }

  async expectFormPage() {
    await expect(this.page).toHaveURL(/form-list(\?|$)/);
  }

  async selectList(name: string) {
    await this.page.getByText(name).click();
  }

  async expectListVisible(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }
}
