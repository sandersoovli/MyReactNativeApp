// app/(tabs)/index.jsx
import CustomHeader from '@/components/ui/CustomHeader';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const handleSearch = () => {
    alert("Otsing avaneb...");
  };

  const categories = [
    { name: 'Popular', icon: 'star-outline', iconType: 'Ionicons' },
    { name: 'Chair', icon: 'chair', iconType: 'FontAwesome5' },
    { name: 'Table', icon: 'desk', iconType: 'MaterialIcons' },
    { name: 'Armchair', icon: 'sofa-single', iconType: 'MaterialCommunityIcons' },
    { name: 'Bed', icon: 'bed', iconType: 'FontAwesome' },
    { name: 'Lamp', icon: 'lamp', iconType: 'MaterialCommunityIcons'}
  ];

  const products = [
    { id: '1', name: 'Modern Chair', price: '€50', image: require('@/assets/images/chair.png') },
    { id: '2', name: 'Wooden Desk', price: '€25', image: require('@/assets/images/desk.png') },
    { id: '3', name: 'Modern Lamp', price: '€35', image: require('@/assets/images/lamp.png') },
    { id: '4', name: 'Minimal Stand', price: '€40', image: require('@/assets/images/table.png') },
  ];

  return (
    <View style={styles.container}>
      {/* 1. CUSTOM HEADER */}
      <CustomHeader 
        title="Find All You Need" 
        leftIconName="search-outline"
        onLeftPress={handleSearch} 
        titleStyle={styles.headerTitle}
      />

      {/* 2. KATEGOORIATE RIDA */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            {cat.iconType === 'Ionicons' && <Ionicons name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            {cat.iconType === 'FontAwesome' && <FontAwesome name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            {cat.iconType === 'FontAwesome5' && <FontAwesome5 name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            {cat.iconType === 'MaterialIcons' && <MaterialIcons name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            {cat.iconType === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={cat.icon} size={24} color="#5C6BC0" style={styles.categoryIcon} />}
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 3. TOODETE NIMEKIRI */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.productsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20, 
    fontWeight: '600',
    textAlign: 'left',
    marginLeft: 0, 
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  productsContainer: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  productPrice: {
    marginTop: 4,
    color: '#5C6BC0',
    fontWeight: 'bold',
  },
});
