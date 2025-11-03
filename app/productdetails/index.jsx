import { useFavorites } from '@/app/(context)/FavoritesContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const options = { headerShown: false };

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { toggleFavorite, isFavorite } = useFavorites();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error('Toote laadimine ebaõnnestus');
        const data = await res.json();
        setProduct({
          id: data.id.toString(),
          name: data.title,
          price: `€${data.price}`,
          image: { uri: data.image },
          description: data.description,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const contactSeller = () => Linking.openURL('mailto:seller@example.com');
  const isFav = isFavorite(id);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F63AC" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', marginBottom: 10 }}>{error || 'Toode ei leitud!'}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: '#4F63AC' }}>⬅ Tagasi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.image} resizeMode="contain" />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(id)}
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
  image: { width: '100%', height: 300, marginBottom: 20 },
  infoContainer: { paddingHorizontal: 20 },
  name: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  price: { fontSize: 18, fontWeight: '600', color: '#5C6BC0', marginBottom: 12 },
  description: { fontSize: 14, color: '#555', lineHeight: 20 },
  favoriteButton: { marginTop: 20, alignSelf: 'flex-start' },
  contactButton: { marginTop: 20, backgroundColor: '#5C6BC0', padding: 12, borderRadius: 10 },
  contactText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
