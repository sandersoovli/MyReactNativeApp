import { useAuth } from '@/app/(context)/AuthContext'; // UUS: Impordime AuthContexti
import { auth } from '@/firebaseConfig'; // Kasutame initsialiseeritud 'auth' objekti
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth'; // Kasutame otse signOut
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // LISATUD: ActivityIndicator

// Menüü nupud (ListItem asendaja)
const ProfileMenuItem = ({ title, subtitle, onPress }) => (
  <TouchableOpacity style={menuStyles.itemContainer} onPress={onPress}>
    <View style={menuStyles.textGroup}>
      <Text style={menuStyles.itemTitle}>{title}</Text>
      <Text style={menuStyles.itemSubtitle}>{subtitle}</Text>
    </View>
    <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
  </TouchableOpacity>
);

/**
 * Väike abifunktsioon, mis muudab stringi kenamaks nimeformaadiks.
 * nt. "john.doe" -> "John Doe"
 */
const formatName = (str) => {
    if (!str) return 'Anonüümne';
    
    // Asendame punktid/allkriipsud tühikutega ja kapitaliseerime iga sõna
    return str
      .replace(/[\._-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
};

// EEMALDATUD MOCK_USER. Kasutame Contexti kasutaja andmeid.

export default function ProfileScreen() {
  const router = useRouter();
  // KASUTAME CONTEXTI KASUTAJA OBJEKTI
  const { user, isLoading } = useAuth(); // Saame stabiilse 'user' objekti
  
  // MOCK: Hetkel pole andmeid kuulutuste kohta
  const listingCount = 10; 
  
  // Ainus loogika, mis siia jääb, on väljalogimine
  const handleSignOut = async () => {
    try {
      if (auth) {
        // Tõeline väljalogimise loogika
        await signOut(auth); 
        // _layout.jsx Navigatsiooniloogika hakkab automaatselt tööle
      }
    } catch (error) {
      console.log('Sign out error:', error);
      Alert.alert('Error', 'Väljalogimine ebaõnnestus. Proovige uuesti.');
    }
  };

  const handleNewListing = () => {
    Alert.alert('New Listing', 'Navigeerimine kuulutuse loomise ekraanile...');
  };
  
  const handleSettings = () => {
    Alert.alert('Settings', 'Navigeerimine seadete ekraanile...');
  };
  
  const handleMyListings = () => {
    Alert.alert('My Listings', 'Navigeerimine kuulutuste ekraanile...');
  };

  if (isLoading) {
    // Kasutame AuthContexti laadimise olekut
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#5C6BC0" />
            <Text style={styles.loadingText}>Autentimise kontroll...</Text>
        </View>
    );
  }

  // UUS KONTROLL: Kui user on null, näita palun sisse logimise ekraani
  if (!user) {
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Palun logige sisse.</Text>
            <TouchableOpacity onPress={() => router.replace('/splash')} style={{ marginTop: 20, padding: 10, backgroundColor: '#5C6BC0', borderRadius: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Mine sisselogimisele</Text>
            </TouchableOpacity>
        </View>
    );
  }
  
  // Kasutaja andmed on olemas ja neid kasutatakse
  const displayName = formatName(user.email.split('@')[0] || user.displayName || 'Anonüümne');

  return (
    <View style={styles.container}>
      {/* SISU KONTEINER - Kasutab flex: 1, et lükata nupud alla */}
      <View style={styles.contentWrapper}>
        
        {/* PÄIS - KASUTAJA INFO JA LOG OUT NUPP */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleSignOut}>
            {/* Väljalogimise ikoon vastavalt prototüübile */}
            <Ionicons name="log-out-outline" size={28} color="#5C6BC0" />
          </TouchableOpacity>
        </View>
        
        {/* KASUTAJA DETAILID */}
        <View style={styles.userInfoContainer}>
          {/* KASUTAME TÕELIST KASUTAJA NIMI/E-POSTI */}
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* MENÜÜVALIKUD */}
        <View style={styles.menuContainer}>
          <ProfileMenuItem 
            title="My Listings" 
            subtitle={`Already have ${listingCount} listing`} 
            onPress={handleMyListings} 
          />
          <ProfileMenuItem 
            title="Settings" 
            subtitle="Account, FAQ, Contact" 
            onPress={handleSettings}
          />
        </View>

      </View>

      {/* LISA KUULUTUS NUPP - Paigutatud ContentWrapperist väljapoole */}
      <TouchableOpacity style={styles.listingButton} onPress={handleNewListing}>
        <Text style={styles.listingButtonText}>Add a new listing</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F7F7F7', // Heledam taust
    paddingHorizontal: 20,
    paddingTop: 60, // Ruumi staatuse ribale
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
  contentWrapper: {
    flex: 1, // Võtab kogu saadaoleva ruumi, lükates nupu alla
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfoContainer: {
    marginBottom: 40,
    alignItems: 'flex-start', // Vasakule joondamine
    paddingVertical: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
  },
  menuContainer: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden', 
    // Lisatud vari vastavalt prototüübile
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Muudetud, et vari oleks nähtavam
    shadowRadius: 5,
    elevation: 5, // Androidi vari
  },
  listingButton: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20, // Ruumi jätmine alumise tabBar jaoks
    width: '100%',
    alignSelf: 'center',
  },
  listingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  signOutPlaceholder: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  footerNote: {
      fontSize: 12,
      color: '#aaa',
  }
});

const menuStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  textGroup: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#888',
    marginTop: 3,
  },
});
