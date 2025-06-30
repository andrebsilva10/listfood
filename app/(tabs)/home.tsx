import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

import { ListItem } from '@/components/ListItem';
import { useShoppingList } from '@/context/ShoppingListContext';
import { EmptyState } from '@/components/EmptyState';
import { ActionSheet } from '@/components/ActionSheet';

import { Plus, CircleAlert as AlertCircle, LogOut } from 'lucide-react-native';

import { useToken } from '@/hooks/useToken';

export default function HomeScreen() {
  const { lists = [], removeList } = useShoppingList();
  const [actionSheetVisible, setActionSheetVisible] = useState(false);
  const [selectedList, setSelectedList] = useState<any>(null);
  const { token, removeToken } = useToken();

  const handleListPress = (list: any) => {
    router.push({
      pathname: '/detail',
      params: { id: list.id, name: list.name },
    });
  };

  const handleEditList = (list: any) => {
    router.push({
      pathname: '/form-list',
      params: { id: list.id },
    });
  };

  const handleDeleteList = (list: any) => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir a lista "${list.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            removeList(list.id);
          },
        },
      ]
    );
  };

  const openActionSheet = (list: any) => {
    setSelectedList(list);
    setActionSheetVisible(true);
  };

  const handleCreateList = () => {
    router.push('/form-list');
  };

  const handleLogout = async () => {
    await removeToken();
    router.replace('/login');
  };

  const showToken = () => {
    Alert.alert('Token', token || 'Nenhum token encontrado');
    console.log('Token:', token || 'Nenhum token encontrado');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={showToken}>
          <Text style={styles.headerButtonText}>Ver Token</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
          <LogOut size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {lists?.length === 0 ? (
        <EmptyState
          icon={<AlertCircle size={48} color="#757575" />}
          message="Nenhuma lista cadastrada"
          actionLabel="Nova Lista"
          onAction={handleCreateList}
        />
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              title={item.name}
              subtitle={`Saldo: R$ ${item.initialBalance.toFixed(2)}`}
              onPress={() => handleListPress(item)}
              onOptions={() => openActionSheet(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity style={styles.fabButton} onPress={handleCreateList}>
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
              handleEditList(selectedList);
            },
          },
          {
            label: 'Excluir',
            onPress: () => {
              setActionSheetVisible(false);
              handleDeleteList(selectedList);
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00B7C6',
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  fabButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00B7C6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
