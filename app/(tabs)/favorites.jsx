import { useFavorites } from '@/app/(context)/FavoritesContext';
import { useRouter } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useProducts from '../hooks/useProducts';

const getImageSource = (img) => typeof img === 'string' ? { uri: img } : img;

const FavoriteItem = ({ product, router }) => (
  <TouchableOpacity 
    style={itemStyles.itemContainer} 
    onPress={() => router.push({ pathname: 'productdetails', params: { id: product.id } })}
  >
    <Image source={getImageSource(product.image)} style={itemStyles.image} resizeMode='contain' />
    <View style={itemStyles.textContainer}>
      <Text style={itemStyles.name}>{product.title || product.name}</Text>
      <Text style={itemStyles.price}>{product.price ? `€${product.price}` : ''}</Text>
    </View>
  </TouchableOpacity>
);

export default function Favorites() {
  const { favorites } = useFavorites();
  const router = useRouter();
  const { products } = useProducts();

  // Eemaldame duplikaadid
  const uniqueProducts = products.filter((product, index, self) =>
    index === self.findIndex((p) => p.id === product.id)
  );

  // Filtreerime ainult lemmikud
  const favoriteProducts = uniqueProducts.filter(product => favorites.includes(product.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites ({favoriteProducts.length})</Text>
      
      {favoriteProducts.length === 0 ? (
        <Text style={styles.emptyText}>You don't have any favorites yet! 💔</Text>
      ) : (
        <FlatList
          data={favoriteProducts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <FavoriteItem product={item} router={router} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0', padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20, textAlign: 'center' },
  emptyText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 50 },
  listContent: { paddingBottom: 20 },
});

const itemStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  name: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 16, color: '#5C6BC0', marginTop: 4 },
});
