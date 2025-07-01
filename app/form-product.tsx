import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useShoppingList } from '@/context/ShoppingListContext';
import { useTheme } from '@/context/ThemeContext';
import { FormInput } from '@/components/FormInput';

export default function FormProductScreen() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [nameError, setNameError] = useState('');
  const [unitPriceError, setUnitPriceError] = useState('');
  const [quantityError, setQuantityError] = useState('');

  const { addProduct, getProductById, updateProduct } = useShoppingList();

  const params = useLocalSearchParams();
  const listId = params.listId as string;
  const productId = params.productId as string;
  const isEditing = !!productId;

  useEffect(() => {
    if (isEditing && listId && productId) {
      const product = getProductById(listId, productId);
      if (product) {
        setName(product.name);
        setUnitPrice(product.unitPrice.toString());
        setQuantity(product.quantity.toString());
      }
    }
  }, [listId, productId, getProductById]);

  const handleSave = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Nome do produto é obrigatório');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!unitPrice.trim()) {
      setUnitPriceError('Preço unitário é obrigatório');
      isValid = false;
    } else {
      setUnitPriceError('');
    }

    if (!quantity.trim()) {
      setQuantityError('Quantidade é obrigatória');
      isValid = false;
    } else {
      setQuantityError('');
    }

    if (isValid) {
      const priceValue = parseFloat(unitPrice);
      if (isNaN(priceValue) || priceValue <= 0) {
        setUnitPriceError('Preço unitário deve ser maior que zero');
        isValid = false;
      }
      const quantityValue = parseFloat(quantity);
      if (
        isNaN(quantityValue) ||
        !Number.isInteger(quantityValue) ||
        quantityValue < 1
      ) {
        setQuantityError('Quantidade deve ser ao menos 1');
        isValid = false;
      }
    }

    if (!isValid) return;

    const productData = {
      name,
      unitPrice: parseFloat(unitPrice),
      quantity: parseFloat(quantity),
    };

    try {
      if (isEditing) {
        updateProduct(listId, productId, productData);
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        addProduct(listId, productData);
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      }
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Houve um erro ao salvar o produto');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.form}>
        <FormInput
          label="Nome do Produto"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Arroz"
          error={nameError}
          required
        />

        <FormInput
          label="Preço Unitário (R$)"
          value={unitPrice}
          onChangeText={(text) => {
            // Remove caracteres não numéricos, exceto o ponto decimal
            const filtered = text.replace(/[^0-9.]/g, '');
            setUnitPrice(filtered);
          }}
          placeholder="0.00"
          keyboardType="numeric"
          error={unitPriceError}
          required
        />

        <FormInput
          label="Quantidade"
          value={quantity}
          onChangeText={(text) => {
            // Remove caracteres não numéricos, exceto o ponto decimal
            const filtered = text.replace(/[^0-9.]/g, '');
            setQuantity(filtered);
          }}
          placeholder="1"
          keyboardType="numeric"
          error={quantityError}
          required
        />

        <View
          style={[
            styles.subtotalContainer,
            { backgroundColor: theme.surfaceColor },
          ]}
        >
          <Text style={[styles.subtotalLabel, { color: theme.primary }]}>
            Subtotal:
          </Text>
          <Text style={[styles.subtotalValue, { color: theme.primary }]}>
            R${' '}
            {(
              parseFloat(unitPrice || '0') * parseFloat(quantity || '0')
            ).toFixed(2)}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelButton,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.borderColor,
              },
            ]}
            onPress={handleCancel}
          >
            <Text
              style={[styles.cancelButtonText, { color: theme.textSecondary }]}
            >
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              { backgroundColor: theme.primary },
            ]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  subtotalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    flex: 0.48,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
  },
  saveButton: {},
  cancelButtonText: {
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
