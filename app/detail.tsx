import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useShoppingList } from '@/context/ShoppingListContext';
import { useTheme } from '@/context/ThemeContext';
import { ProductItem } from '@/components/ProductItem';
import { EmptyState } from '@/components/EmptyState';
import { ActionSheet } from '@/components/ActionSheet';
import { Plus, ShoppingCart, CreditCard as Edit } from 'lucide-react-native';

export default function DetailScreen() {
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const listId = params.id as string;

  const { lists, getListById, removeProduct } = useShoppingList();
  const [list, setList] = useState<any>(null);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    const currentList = getListById(listId);
    setList(currentList);
  }, [listId, lists]);

  const calculateRemainingBalance = () => {
    if (!list) return 0;

    const totalSpent = list.products.reduce(
      (sum: number, product: any) => sum + product.unitPrice * product.quantity,
      0
    );

    return list.initialBalance - totalSpent;
  };

  const handleEditList = () => {
    router.push({
      pathname: '/form-list',
      params: { id: listId },
    });
  };

  const handleAddProduct = () => {
    router.push({
      pathname: '/form-product',
      params: { listId },
    });
  };

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
    setActionSheetVisible(true);
  };

  const handleEditProduct = (product: any) => {
    router.push({
      pathname: '/form-product',
      params: { listId, productId: product.id },
    });
  };

  const handleDeleteProduct = (product: any) => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir o produto "${product.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            removeProduct(listId, product.id);
            const updatedList = getListById(listId);
            setList(updatedList);
          },
        },
      ]
    );
  };

  if (!list) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.errorText, { color: theme.errorColor }]}>
          Lista não encontrada
        </Text>
      </View>
    );
  }

  const remainingBalance = calculateRemainingBalance();
  const balanceColor =
    remainingBalance >= 0 ? theme.successColor : theme.errorColor;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View
        style={[
          styles.balanceContainer,
          { backgroundColor: theme.cardBackground },
        ]}
      >
        <View style={styles.balanceInfo}>
          <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>
            Saldo Inicial
          </Text>
          <Text style={[styles.balanceValue, { color: theme.primary }]}>
            R$ {list.initialBalance.toFixed(2)}
          </Text>
        </View>

        <View style={styles.balanceInfo}>
          <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>
            Saldo Restante
          </Text>
          <Text style={[styles.balanceValue, { color: balanceColor }]}>
            R$ {remainingBalance.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.editListButton, { backgroundColor: theme.primary }]}
          onPress={handleEditList}
        >
          <Edit size={16} color="#FFFFFF" />
          <Text style={styles.editListButtonText}>Editar Lista</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Produtos
        </Text>

        {list.products.length === 0 ? (
          <EmptyState
            icon={<ShoppingCart size={48} color={theme.textSecondary} />}
            message="Nenhum produto cadastrado"
            actionLabel="Adicionar Produto"
            onAction={handleAddProduct}
          />
        ) : (
          <FlatList
            data={list.products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductItem
                name={item.name}
                unitPrice={item.unitPrice}
                quantity={item.quantity}
                subtotal={item.unitPrice * item.quantity}
                onPress={() => handleProductPress(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <TouchableOpacity
        style={[styles.fabButton, { backgroundColor: theme.primary }]}
        onPress={handleAddProduct}
      >
        <Plus size={24} color="#FFF" />
      </TouchableOpacity>

      <ActionSheet
        visible={actionSheetVisible}
        onClose={() => setActionSheetVisible(false)}
        options={[
          {
            label: 'Editar',
            onPress: () => {
              setActionSheetVisible(false);
              handleEditProduct(selectedProduct);
            },
          },
          {
            label: 'Excluir',
            onPress: () => {
              setActionSheetVisible(false);
              handleDeleteProduct(selectedProduct);
            },
            destructive: true,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
  balanceContainer: {
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
  },
  balanceValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  editListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  editListButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  productsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
