import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  async addProduct(name: string, price: string, quantity: string) {
    await this.openForm();
    await this.fillName(name);
    await this.fillPrice(price);
    await this.fillQuantity(quantity);
    await this.save();
  }

  async openForm() {
    await this.page.getByText('Adicionar Produto').click();
  }

  async fillName(name: string) {
    await this.page.getByPlaceholder('Ex: Arroz').fill(name);
  }

  async fillPrice(price: string) {
    await this.page.getByPlaceholder('0.00').fill(price);
  }

  async fillQuantity(quantity: string) {
    await this.page.getByPlaceholder('1').fill(quantity);
  }

  async save() {
    await this.page.getByText('Salvar').click();
  }

  async expectError(field: 'Nome' | 'Preço unitário' | 'Quantidade') {
    const messageMap = {
      Nome: 'Nome do produto é obrigatório',
      'Preço unitário': 'Preço unitário é obrigatório',
      Quantidade: 'Quantidade é obrigatória',
    };
    await expect(this.page.getByText(messageMap[field])).toBeVisible();
  }

  async expectOnForm() {
    await expect(this.page).toHaveURL(/form-product(\?|$)/);
  }

  async expectDetailPage(name: string) {
    await expect(this.page).toHaveURL(/detail\?id=/);
    await expect(this.page.getByText(name)).toBeVisible();
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
