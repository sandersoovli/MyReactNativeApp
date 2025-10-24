import { useAuth } from '@/app/(context)/AuthContext';
import ListItem from '@/components/ListItem';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { user } = useAuth();
  const router = useRouter();

  // Funktsioon info muutmiseks
  const handleEditPersonalInfo = () => {
    router.push('/edit-personal-info'); // Üks leht, kus saab muuta nii nime kui emaili
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.push('/profile')} style={{ padding: 10 }}>
                <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
          ),
        }}
      />
      <Text style={styles.headerTitle}>Settings</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Isiklik info */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TouchableOpacity
          style={styles.editableRow}
          onPress={handleEditPersonalInfo}
        >
          <View style={styles.infoContent}>
            <ListItem title="Name" subtitle={user?.displayName || 'User'} />
            <ListItem title="Email" subtitle={user?.email || 'user@mail.com'} />
          </View>
          <Ionicons name="pencil-outline" size={24} color="#4F63AC" />
        </TouchableOpacity>

        {/* Help Center */}
        <Text style={styles.sectionTitle}>Help Center</Text>
        <ListItem 
            title="Personal Information"
            subtitle="Manage your profile details"
            onPress={() => router.push('/help-personal-info')}
        />
        <ListItem 
            title="Account & Security"
            subtitle="Change password, email, or security settings"
            onPress={() => router.push('/help-account-security')}
        />
        <ListItem 
          title="Privacy Policy"
          subtitle="View our privacy practices"
          onPress={() => router.push('/terms-privacy')}
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
  
  editableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor:"#000",
    shadowOffset:{ width:0, height:1 },
    shadowOpacity:0.1,
    shadowRadius:2.22,
    elevation:3,
  },
  infoContent: {
    flex: 1, // See tagab, et ListItem kastid võtavad kogu saadaoleva ruumi
    marginRight: 10,
  },
});
