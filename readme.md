# ListFood - Aplicativo de Lista de Compras para Supermercado

## Descrição

O ListFood é um aplicativo desenvolvido com Expo e React Native, projetado para auxiliar os usuários na criação e gerenciamento de listas de compras de supermercado. Com uma interface intuitiva e funcionalidades práticas, o ListFood permite que você organize suas compras, controle seus gastos e tenha uma experiência de compra mais eficiente.

## Funcionalidades Principais

- **Criação de Listas:** Crie listas de compras personalizadas com nomes e orçamentos definidos.
- **Gerenciamento de Produtos:** Adicione produtos às suas listas, especificando nome, preço unitário e quantidade.
- **Cálculo Automático:** O aplicativo calcula automaticamente o subtotal de cada produto e o saldo restante na lista.
- **Interface Intuitiva:** Design limpo e fácil de usar, proporcionando uma experiência agradável ao usuário.
- **Edição e Exclusão:** Edite ou exclua listas e produtos com facilidade.

## Prints das Telas

### Tela Inicial (Listas)

<img src="/assets/images/listas.png" width="300">

### Tela de Detalhes da Lista

<img src="/assets/images/detalhes-lista.png" width="300">

### Tela de Criação/Edição de Lista

<img src="/assets/images/criacao-lista.png" width="300">

### Tela de Criação/Edição de Produto

<img src="/assets/images/criacao-produto.png" width="300">

### Tela Sobre

<img src="/assets/images/sobre.png" width="300">

## Como Executar o Projeto

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/andrebsilva10/listfood.git
    cd listfood
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o aplicativo:**

    ```bash
    npx expo start --tunnel
    ```

    Isso iniciará o aplicativo Expo, que pode ser acessado através do Expo Go em seu dispositivo móvel ou emulador.

## Informações Adicionais

- Este projeto foi desenvolvido utilizando Expo com TypeScript, seguindo as boas práticas de desenvolvimento mobile com React Native.
- O Expo Router foi utilizado para criar uma navegação fluida e eficiente entre as telas do aplicativo.
- A interface do usuário foi projetada para proporcionar uma experiência agradável e intuitiva.

## Diferença entre Testes Unitários e Testes E2E

- **Testes Unitários**: Validam partes isoladas do código, como componentes, funções ou hooks, sem dependências externas. Exemplo: testar se o componente `ProductItem` exibe corretamente o nome e subtotal do produto.
- **Testes E2E (End-to-End)**: Simulam o uso real do app, cobrindo fluxos completos (ex: criar lista, adicionar produto, navegar entre telas). Eles garantem que todas as partes do sistema funcionam juntas como esperado.

## Como rodar os testes

### Testes E2E (Playwright)

1. Rode o app em modo web:
   ```bash
   npx expo start --web
   ```

2. Em outro terminal, rode os testes E2E:
   ```bash
    npx playwright test
    ```
