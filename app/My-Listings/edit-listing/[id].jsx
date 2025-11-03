import { useListings } from '@/app/(context)/ListingsContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function EditListingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // võta id õigest kohast
  const { listings, updateListing } = useListings() || {};

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [listingFound, setListingFound] = useState(false);

  useEffect(() => {
    if (!id || !listings) return;
    const listing = listings.find(l => String(l.id) === String(id));
    if (listing) {
      setTitle(listing.title ?? '');
      setPrice(String(listing.price ?? ''));
      setListingFound(true);
    } else {
      setListingFound(false);
    }
  }, [id, listings]);

  const handleSave = async () => {
    if (!title || !price) return Alert.alert('Error', 'Fill all fields');
    setLoading(true);
    try {
      // kui updateListing on sünkroonne, see töötab samuti
      await updateListing(id, { title, price: parseFloat(price) });
      Alert.alert('Success', 'Listing updated!');
      router.back();
    } catch (e) {
      Alert.alert('Error', 'Could not update listing');
      console.warn('updateListing error', e);
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={{ textAlign: 'center', color: '#555' }}>Invalid listing id</Text>
      </ScrollView>
    );
  }

  if (!listingFound) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ActivityIndicator size="large" color="#4857A6" />
        <Text style={{ marginTop: 20, textAlign: 'center', color: '#555' }}>
          Loading listing...
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Listing</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title" />

      <Text style={styles.label}>Price (€)</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="Enter price" />

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F7F7F7' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#4857A6', padding: 15, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});