import CustomHeader from '@/components/ui/CustomHeader';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useProducts from '../hooks/useProducts';

const getImageSource = (img) => typeof img === 'string' ? { uri: img } : img;

export default function HomeScreen() {
  const router = useRouter();
  const { products, loading, error, fetchProducts } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = () => alert('Search opens...');

  // Kategooriad, mida kasutaja näeb
  const categories = [
    { name: 'All', icon: 'apps', iconType: 'Ionicons' },
    { name: 'electronics', icon: 'tv', iconType: 'MaterialIcons' },
    { name: 'jewelery', icon: 'diamond', iconType: 'MaterialCommunityIcons' },
    { name: "men's clothing", icon: 'tshirt-crew', iconType: 'MaterialCommunityIcons' },
    { name: "women's clothing", icon: 'tshirt-crew-outline', iconType: 'MaterialCommunityIcons' },
    //{ name: 'home', icon: 'home', iconType: 'Ionicons' },
    //{ name: 'accessories', icon: 'watch', iconType: 'MaterialCommunityIcons' },
  ];

  // Eemaldame duplikaadid id alusel
  const uniqueProducts = useMemo(() => {
    return products.filter((product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
    );
  }, [products]);

  // Filtreerime kategooria järgi
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return uniqueProducts;
    return uniqueProducts.filter(p => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory, uniqueProducts]);

  if (loading && products.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F63AC" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', marginBottom: 10 }}>Error: {error}</Text>
        <TouchableOpacity onPress={fetchProducts}>
          <Text style={{ color: '#4F63AC' }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Funtsioon, et muuta API kategooriad ilusaks pealkirjaks
  const formatCategoryName = (cat) => {
    if (cat === 'electronics') return 'Electronics';
    if (cat === 'jewelery') return 'Jewelery';
    if (cat === "men's clothing") return "Men's Clothing";
    if (cat === "women's clothing") return "Women's Clothing";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Find All You Need" leftIconName="search-outline" onLeftPress={handleSearch} titleStyle={styles.headerTitle} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity 
            key={`${cat.name}-${index}`} 
            style={[styles.categoryItem, selectedCategory === cat.name && styles.selectedCategory]}
            onPress={() => setSelectedCategory(cat.name)}
          >
            {cat.iconType === 'Ionicons' && <Ionicons name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            {cat.iconType === 'FontAwesome' && <FontAwesome name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            {cat.iconType === 'FontAwesome5' && <FontAwesome5 name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            {cat.iconType === 'MaterialIcons' && <MaterialIcons name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            {cat.iconType === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            <Text style={styles.categoryText}>{formatCategoryName(cat.name)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => router.push(`/productdetails?id=${item.id}`)}>
            <Image source={getImageSource(item.image)} style={styles.productImage} />
            <Text style={styles.productName}>{item.title || item.name}</Text>
            <Text style={styles.productPrice}>{item.price ? `€${item.price}` : ''}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchProducts} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { fontSize: 20, fontWeight: '600', textAlign: 'left', marginLeft: 0, flex: 1 },
  categoryContainer: { flexDirection: 'row', paddingVertical: 10, marginBottom: 10 },
  categoryItem: { alignItems: 'center', marginRight: 20 },
  selectedCategory: { borderBottomWidth: 2, borderBottomColor: '#4F63AC' },
  categoryIcon: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 10, marginBottom: 5 },
  categoryText: { fontSize: 12, color: '#333', fontWeight: '500' },
  productsContainer: { paddingBottom: 20 },
  productCard: { flex: 1, margin: 10, backgroundColor: '#fff', borderRadius: 12, padding: 10, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  productImage: { width: 100, height: 100, resizeMode: 'contain' },
  productName: { marginTop: 8, fontWeight: '600', fontSize: 14, textAlign: 'center' },
  productPrice: { marginTop: 4, color: '#5C6BC0', fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
