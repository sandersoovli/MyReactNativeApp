import { useListings } from '@/app/(context)/ListingsContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const options = {
  title: 'My Listings',
};
const MyListingsScreen = () => {
  const router = useRouter();
  const { listings, deleteListing } = useListings();

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Listing',
      'Are you sure you want to delete this listing?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteListing(id) },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>My Listings</Text>

      {listings.length === 0 ? (
        <Text style={styles.noListings}>You have no listings yet.</Text>
      ) : (
        listings.map(listing => (
          <View key={listing.id} style={styles.listingCard}>
            {listing.photos?.[0]?.uri && <Image source={{ uri: listing.photos[0].uri }} style={styles.photo} />}
            <View style={styles.info}>
              <Text style={styles.title}>{listing.title}</Text>
              <Text style={styles.price}>{listing.price}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => router.push(`/edit-listing/${listing.id}`)} style={styles.actionBtn}>
                <Ionicons name="create-outline" size={20} color="#4857A6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(listing.id)} style={styles.actionBtn}>
                <Ionicons name="trash-outline" size={20} color="#D9534F" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F7F7F7' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  noListings: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 50 },
  listingCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 10, marginBottom: 15, alignItems: 'center', shadowColor:"#000", shadowOffset:{ width:0, height:1 }, shadowOpacity:0.1, shadowRadius:2.22, elevation:3 },
  photo: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  price: { fontSize: 14, color: '#666', marginTop: 3 },
  actions: { flexDirection: 'row' },
  actionBtn: { marginLeft: 10 },
});

export default MyListingsScreen;
