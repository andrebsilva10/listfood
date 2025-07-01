import { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { EllipsisVertical, ChevronRight } from 'lucide-react-native';

interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  onOptions: () => void;
}

export const ListItem = memo(
  ({ title, subtitle, onPress, onOptions }: ListItemProps) => {
    return (
      <TouchableOpacity
        testID="listitem-container"
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            testID="listitem-options-button"
            style={styles.optionsButton}
            onPress={(e) => {
              e?.stopPropagation?.();
              onOptions();
            }}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <EllipsisVertical size={20} color="#757575" />
          </TouchableOpacity>

          <ChevronRight size={20} color="#BBBBBB" />
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
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#757575',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsButton: {
    padding: 8,
    marginRight: 8,
  },
});
