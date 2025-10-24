// path: app/edit-personal-info.jsx
import { useAuth } from '@/app/(context)/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditPersonalInfo() {
  const { user, updateUserInfo } = useAuth(); // eeldan, et updateUserInfo on Context'is olemas
  const router = useRouter();

  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserInfo({ displayName: name, email }); // Context/Firebase update
      Alert.alert('Success', 'Your information has been updated.');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to update info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Edit Personal Information</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, marginTop: 15 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width:0, height:1 },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  saveButton: {
    backgroundColor: '#4F63AC',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
