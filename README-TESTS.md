# Testes Unitários - ListFood

Este documento descreve a implementação de testes unitários para a aplicação ListFood, desenvolvida com React Native/Expo.

## Estrutura dos Testes

### Componentes Testados

1. **ListItem** (`__tests__/components/ListItem.test.tsx`)
2. **ProductItem** (`__tests__/components/ProductItem.test.tsx`)
3. **FormInput** (`__tests__/components/FormInput.test.tsx`)

### Hook Testado

1. **useToken** (`__tests__/hooks/useToken.test.tsx`)

### Context Testado

1. **ShoppingListContext** (`__tests__/context/ShoppingListContext.test.tsx`)

## Bibliotecas Utilizadas

- **Jest**: Framework de testes principal
- **@testing-library/react-native**: Biblioteca para testes de componentes React Native
- **@testing-library/jest-native**: Extensões específicas para Jest com React Native
- **jest-expo**: Preset do Jest configurado para projetos Expo

## Casos de Teste Implementados

### ListItem Component (6 testes)
- ✅ Renderização correta de título e subtítulo
- ✅ Renderização apenas do título quando subtítulo não é fornecido
- ✅ Chamada da função onPress ao pressionar o container
- ✅ Truncamento de títulos longos
- ✅ Propriedades de acessibilidade
- ✅ Renderização sem erros

### ProductItem Component (8 testes)
- ✅ Renderização correta das informações do produto
- ✅ Exibição correta dos rótulos
- ✅ Formatação de preços com duas casas decimais
- ✅ Tratamento correto de quantidades decimais
- ✅ Chamada da função onPress ao pressionar o componente
- ✅ Truncamento de nomes longos de produtos
- ✅ Recálculo do subtotal quando props mudam
- ✅ Tratamento correto de valores zero

### FormInput Component (9 testes)
- ✅ Renderização correta do rótulo
- ✅ Exibição do asterisco quando required=true
- ✅ Não exibição do asterisco quando required=false
- ✅ Exibição de mensagem de erro quando fornecida
- ✅ Não exibição de erro quando não fornecido
- ✅ Chamada da função onChangeText
- ✅ Aplicação de estilo de erro
- ✅ Passagem de props adicionais do TextInput
- ✅ Exibição do valor atual no input

### useToken Hook (8 testes)
- ✅ Inicialização com token null e estado de loading
- ✅ Carregamento de token salvo do storage
- ✅ Tratamento quando nenhum token está salvo
- ✅ Salvamento correto de token
- ✅ Remoção correta de token
- ✅ Tratamento gracioso de erros de storage
- ✅ Não atualização de estado após unmount
- ✅ Tratamento de múltiplas operações rápidas

### ShoppingListContext (12 testes)
- ✅ Inicialização com array vazio de listas
- ✅ Adição correta de nova lista
- ✅ Atualização correta de lista existente
- ✅ Remoção correta de lista
- ✅ Busca de lista por ID
- ✅ Retorno undefined para lista inexistente
- ✅ Adição correta de produto à lista
- ✅ Atualização correta de produto
- ✅ Remoção correta de produto
- ✅ Busca de produto por ID
- ✅ Retorno undefined para produto de lista inexistente
- ✅ Erro quando usado fora do provider

## Comandos para Executar os Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

## Configuração

### Jest Configuration
O arquivo `jest.config.js` contém as configurações específicas para o projeto Expo, incluindo:
- Preset jest-expo
- Transform ignore patterns para módulos do React Native
- Mapeamento de módulos para alias @/
- Configuração de coverage

### Setup de Testes
O arquivo `__tests__/setup.ts` contém:
- Mocks para react-native-reanimated
- Mocks para AsyncStorage
- Mocks para expo-router
- Mocks para ícones do lucide-react-native

## Qualidade dos Testes

Todos os testes implementados seguem as melhores práticas:

1. **Testes Úteis**: Cada teste verifica funcionalidades específicas e relevantes
2. **Isolamento**: Testes são independentes e não afetam uns aos outros
3. **Mocking Adequado**: Dependências externas são mockadas apropriadamente
4. **Cobertura Abrangente**: Testes cobrem casos de sucesso, erro e edge cases
5. **Legibilidade**: Nomes descritivos e estrutura clara
6. **Manutenibilidade**: Testes fáceis de entender e modificar

## Métricas de Cobertura

Os testes implementados cobrem:
- Renderização de componentes
- Interações do usuário
- Estados de erro
- Lógica de negócio
- Gerenciamento de estado
- Operações assíncronas
- Ciclo de vida de componentes

Esta implementação garante que os componentes e hooks principais da aplicação estejam funcionando corretamente e sejam resistentes a regressões.