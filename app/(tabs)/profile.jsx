// app/(tabs)/profile.jsx
import { auth } from '@/firebaseConfig'; // Kui kasutad Firebase auth
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Kui kasutad Firebase auth
      if (auth) {
        await auth.signOut();
      }

      // Suuna Splash ekraanile ja asenda navigation stack
      router.replace('/splash');
    } catch (error) {
      console.log('Sign out error:', error);
      Alert.alert('Error', 'Sign out failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  signOutButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});