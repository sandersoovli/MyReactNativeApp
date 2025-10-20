// path: app/(tabs)/profile.jsx
import { useAuth } from '@/app/(context)/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  // Väljalogimise funktsioon
  const handleSignOut = async () => {
    try {
      console.log('logout is clicked');
      await logout();
      router.replace('/splash'); 
    } catch (error) {
      Alert.alert('Viga', 'Väljalogimine ebaõnnestus. Proovi uuesti.');
      console.error(error);
    }
  };

  // Kasutajanime formatiseerimine
  const formatName = (str) => {
    if (!str) return 'Anonüümne';
    return str
      .replace(/[\._-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Laadimise olek
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5C6BC0" />
        <Text style={styles.loadingText}>Autentimise kontroll...</Text>
      </View>
    );
  }

  // Kui kasutaja pole sisse logitud
  if (!isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.message}>Sa ei ole sisse logitud.</Text>
        <TouchableOpacity
          onPress={() => router.replace('/splash')}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Logi sisse</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const displayName = formatName(user.displayName || user.email?.split('@')[0] || 'Anonüümne');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="log-out-outline" size={28} color="#5C6BC0" />
        </TouchableOpacity>
      </View>

      {/* Kasutaja info */}
      <View>
        <Text style={styles.userName}>{displayName}</Text>
        <Text style={styles.userEmail}>{user.email || '-'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, backgroundColor: '#F7F7F7' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  userName: { fontSize: 22, fontWeight: '700', marginBottom: 5 },
  userEmail: { fontSize: 16, color: '#555' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 18, color: '#555', marginTop: 10 },
  message: { fontSize: 18, marginBottom: 20, color: '#333', textAlign: 'center' },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#5C6BC0',
    borderRadius: 8,
  },
  loginButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
