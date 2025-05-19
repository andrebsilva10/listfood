import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useShoppingList } from '@/context/ShoppingListContext';
import { FormInput } from '@/components/FormInput';

export default function FormListScreen() {
  const [name, setName] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [nameError, setNameError] = useState('');

  const { addList, lists, updateList } = useShoppingList();
  const params = useLocalSearchParams();
  const listId = params.id as string;
  const isEditing = !!listId;

  useEffect(() => {
    if (isEditing) {
      const list = lists.find((list) => list.id === listId);
      if (list) {
        setName(list.name);
        setInitialBalance(list.initialBalance.toString());
      }
    }
  }, [listId, lists]);

  const handleSave = () => {

    let isValid = true;

    if (!name.trim()) {
      setNameError('Nome da lista é obrigatório');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!isValid) return;

    const numericBalance = initialBalance ? parseFloat(initialBalance) : 0;

    try {
      if (isEditing) {
        updateList(listId, { name, initialBalance: numericBalance });
        Alert.alert('Sucesso', 'Lista atualizada com sucesso!');
      } else {
        addList({ name, initialBalance: numericBalance });
        Alert.alert('Sucesso', 'Lista criada com sucesso!');
      }
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Houve um erro ao salvar a lista');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.form}>
        <FormInput
          label="Nome da Lista"
          value={name}
          onChangeText={setName}
          placeholder="Ex: Compras do mês"
          error={nameError}
          required
        />

        <FormInput
          label="Saldo Inicial (R$)"
          value={initialBalance}
          onChangeText={(text) => {
            // Remover caracteres não numéricos, exceto o ponto decimal
            const filtered = text.replace(/[^0-9.]/g, '');
            setInitialBalance(filtered);
          }}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
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
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 16,
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  saveButton: {
    backgroundColor: '#00B7C6',
  },
  cancelButtonText: {
    color: '#757575',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
