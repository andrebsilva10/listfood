import { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { EllipsisVertical, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  onOptions: () => void;
}

export const ListItem = memo(
  ({ title, subtitle, onPress, onOptions }: ListItemProps) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
      container: {
        backgroundColor: theme.cardBackground,
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: theme.shadowColor,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: theme.shadowOpacity,
        shadowRadius: 2,
        elevation: 2,
      },
      content: {
        flex: 1,
      },
      title: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.textPrimary,
        marginBottom: 4,
      },
      subtitle: {
        fontSize: 14,
        color: theme.textSecondary,
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
            <EllipsisVertical size={20} color={theme.textSecondary} />
          </TouchableOpacity>

          <ChevronRight size={20} color={theme.textTertiary} />
        </View>
      </TouchableOpacity>
    );
  }
);
