// ProductDetail.jsx
import { useFavorites } from '@/app/context/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// AJUTINE: Tooted tuleks tegelikult laadida väljaspoolt
const products = [
  { id: '1', name: 'Modern Chair', price: '€50', image: require('@/assets/images/chair.png'), description: 'Comfortable modern chair for your living room.' },
  { id: '2', name: 'Wooden Desk', price: '€25', image: require('@/assets/images/desk.png'), description: 'A sturdy wooden desk perfect for work.' },
  { id: '3', name: 'Modern Lamp', price: '€35', image: require('@/assets/images/lamp.png'), description: 'Stylish lamp with adjustable brightness.' },
  { id: '4', name: 'Minimal Stand', price: '€40', image: require('@/assets/images/table.png'), description: 'Minimal stand for your room.' },
];

export const options = { headerShown: false };

export default function ProductDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params; 

  const { toggleFavorite, isFavorite } = useFavorites(); 

  const product = products.find(p => p.id === id);
  const isFav = isFavorite(id); 

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Toode ei leitud!</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 10 }}>
          <Text style={{ color: '#5C6BC0' }}>⬅ Tagasi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const contactSeller = () => Linking.openURL('mailto:seller@example.com');

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>

        {/* LEMMIKUTE NUPP */}
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => toggleFavorite(id)} // Saadetakse ainult ID
        >
          <Ionicons 
            name={isFav ? 'heart' : 'heart-outline'} 
            size={28} 
            color={isFav ? 'red' : '#333'} 
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactButton} onPress={contactSeller}>
          <Text style={styles.contactText}>Contact Seller</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 300, resizeMode: 'contain', marginBottom: 20 },
  infoContainer: { paddingHorizontal: 20 },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  price: { fontSize: 18, fontWeight: '600', color: '#5C6BC0', marginBottom: 12 },
  description: { fontSize: 14, color: '#555', lineHeight: 20 },
  favoriteButton: { marginTop: 20, alignSelf: 'flex-start' },
  contactButton: { marginTop: 20, backgroundColor: '#5C6BC0', padding: 12, borderRadius: 10 },
  contactText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});