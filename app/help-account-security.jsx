import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HelpAccountSecurity() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Account & Security</Text>
        <Text style={styles.text}>
          Here you can manage your account settings, including changing your password, 
          updating your email, and configuring security options to keep your account safe.
        </Text>
      </ScrollView>

      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, lineHeight: 24, color: '#333' },
  closeButton: {
    position: 'absolute', bottom: 20, left: 20, right: 20, height: 60,
    borderRadius: 12, backgroundColor: '#4F63AC', justifyContent: 'center', alignItems: 'center'
  },
  closeButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
