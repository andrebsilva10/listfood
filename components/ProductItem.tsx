import { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface ProductItemProps {
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  onPress: () => void;
}

export const ProductItem = memo(
  ({ name, unitPrice, quantity, subtotal, onPress }: ProductItemProps) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Preço Unit.</Text>
            <Text style={styles.detailValue}>R$ {unitPrice.toFixed(2)}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Qtd.</Text>
            <Text style={styles.detailValue}>{quantity}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'flex-start',
  },
  detailLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  subtotalValue: {
    fontSize: 14,
    color: '#00B7C6',
    fontWeight: '700',
  },
});
