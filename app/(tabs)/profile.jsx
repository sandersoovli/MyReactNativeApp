// path: app/(tabs)/profile.jsx
import { useAuth } from '@/app/(context)/AuthContext';
import { useListings } from '@/app/(context)/ListingsContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ProfileScreen() {
  const { user, isLoading, logout, isAuthenticated } = useAuth();
  const { listings } = useListings(); // <- siin loeme listingute arvu
  const router = useRouter();

  // Kasutajanime format
  const formatName = (str) => {
    if (!str) return 'Anonüümne';
    return str
      .replace(/[\._-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const displayName = formatName(user?.displayName || user?.email?.split('@')[0] || 'Anonüümne');

  // Väljalogimise funktsioon
  const handleSignOut = async () => {
    try {
      await logout();
      router.replace('/splash');
    } catch (error) {
      Alert.alert('Viga', 'Väljalogimine ebaõnnestus. Proovi uuesti.');
      console.error(error);
    }
  };

  // Loader
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

  // --- Profiili päis
  const ProfileHeader = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.userName}>{displayName}</Text>
        <Text style={styles.userEmail}>{user.email || '-'}</Text>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );

  // --- Profiili valikute komponent
  const ProfileOption = ({ title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <ProfileHeader />

      <View style={styles.optionsGroup}>
        <ProfileOption
          title="My Listings"
          subtitle={`Already have ${listings.length} listing(s)`} // <- kasutab konteksti
          onPress={() => router.push('/My-Listings/my-listings')}
        />
        <ProfileOption
          title="Settings"
          subtitle="Account, FAQ, Contact"
          onPress={() => router.push('/Settings')}
        />
      </View>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => router.push('/My-Listings/add-listing')}
      >
        <Text style={styles.addButtonText}>Add a new listing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7F7F7' },
  loadingContainer: { flex:1, justifyContent:'center', alignItems:'center' },
  loadingText: { fontSize: 18, color:'#555', marginTop:10 },
  message: { fontSize:18, color:'#333', marginBottom:20, textAlign:'center' },
  loginButton: { paddingHorizontal:20, paddingVertical:10, backgroundColor:'#5C6BC0', borderRadius:8 },
  loginButtonText: { color:'#fff', fontWeight:'700', fontSize:16 },
  headerContainer: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:30 },
  userName: { fontSize:22, fontWeight:'600', color:'#333' },
  userEmail: { fontSize:14, color:'#666', marginTop:2 },
  logoutButton: { padding:5 },
  optionsGroup: { marginBottom:20 },
  optionContainer: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:15, backgroundColor:'#fff', borderRadius:12, marginBottom:10, shadowColor:"#000", shadowOffset:{ width:0, height:1 }, shadowOpacity:0.1, shadowRadius:2.22, elevation:3 },
  optionTitle: { fontSize:16, fontWeight:'600', color:'#333' },
  optionSubtitle: { fontSize:12, color:'#999', marginTop:2 },
  addButton: { backgroundColor: '#4857A6', paddingVertical:15, borderRadius:12, marginTop:10, shadowColor: "#4857A6", shadowOffset: { width:0, height:4 }, shadowOpacity:0.3, shadowRadius:5.46, elevation:9 },
  addButtonText: { color:'#fff', fontSize:16, fontWeight:'bold', textAlign:'center' },
});
