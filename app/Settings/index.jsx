import ListItem from '@/components/ListItem';
import { useRouter } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();

  const handleNavigation = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Settings</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Help Center */}
        <Text style={styles.sectionTitle}>Help Center</Text>
        <ListItem 
          title="Personal Information"
          onPress={() => handleNavigation('https://www.google.com')}
        />
        <ListItem 
          title="Account & Security"
          onPress={() => handleNavigation('https://www.google.com')}
        />
        <ListItem 
          title="Privacy Policy"
          onPress={() => handleNavigation('https://www.google.com')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  scrollContent: { paddingBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
});
