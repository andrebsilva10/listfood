import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  required?: boolean;
}

export function FormInput({ label, error, required, ...rest }: FormInputProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: theme.textPrimary,
    },
    required: {
      color: theme.errorColor,
    },
    input: {
      backgroundColor: theme.inputBackground,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme.textPrimary,
    },
    inputError: {
      borderColor: theme.errorColor,
    },
    errorText: {
      color: theme.errorColor,
      fontSize: 14,
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>

      <TextInput
        testID={`forminput-${label.toLowerCase()}`}
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={theme.placeholderText}
        {...rest}
      />

      {error ? (
        <Text
          style={styles.errorText}
          testID={`forminput-error-${label.toLowerCase()}`}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
