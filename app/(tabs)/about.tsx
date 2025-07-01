import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function AboutScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={[styles.logo, { backgroundColor: theme.primary }]}>
            <Text style={styles.logoText}>LF</Text>
          </View>
          <Text style={[styles.appName, { color: theme.primary }]}>
            ListFood
          </Text>
        </View>

        <Text style={[styles.version, { color: theme.textSecondary }]}>
          Versão 1.0.0
        </Text>

        <View
          style={[styles.section, { backgroundColor: theme.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Sobre o Aplicativo
          </Text>
          <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
            O ListFood é um aplicativo de lista de compras para supermercado que
            ajuda você a organizar suas compras e controlar seus gastos. Crie
            listas de compras, adicione produtos, e acompanhe seu saldo em tempo
            real.
          </Text>
        </View>

        <View
          style={[styles.section, { backgroundColor: theme.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Como Usar
          </Text>
          <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
            1. Crie uma nova lista de compras{'\n'}
            2. Adicione produtos à sua lista{'\n'}
            3. Defina preços e quantidades{'\n'}
            4. Acompanhe seu saldo enquanto faz compras
          </Text>
        </View>

        <View
          style={[styles.section, { backgroundColor: theme.cardBackground }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            Contato
          </Text>
          <Text style={[styles.sectionText, { color: theme.textPrimary }]}>
            Dúvidas, sugestões ou problemas?{'\n'}
            Entre em contato: listfood@exemplo.com
          </Text>
        </View>

        <Text style={[styles.footer, { color: theme.textSecondary }]}>
          © 2025 ListFood. Todos os direitos reservados.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  version: {
    fontSize: 16,
    marginBottom: 32,
  },
  section: {
    width: '100%',
    marginBottom: 24,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    marginTop: 16,
    fontSize: 14,
  },
});
