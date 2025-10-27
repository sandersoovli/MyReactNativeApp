import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
  const [listings, setListings] = useState([]);

  // Laadib kuulutused AsyncStorage'st
  useEffect(() => {
    const loadListings = async () => {
      try {
        const storedListings = await AsyncStorage.getItem('@my_listings');
        if (storedListings) setListings(JSON.parse(storedListings));
      } catch (error) {
        console.error('Failed to load listings:', error);
      }
    };
    loadListings();
  }, []);

  // Salvestab kuulutused AsyncStorage'sse
  const saveListings = async (newListings) => {
    try {
      await AsyncStorage.setItem('@my_listings', JSON.stringify(newListings));
    } catch (error) {
      console.error('Failed to save listings:', error);
    }
  };

  // Lisab uue kuulutuse
  const addListing = (listing) => {
    const newListing = { id: Date.now().toString(), ...listing };
    const updatedListings = [newListing, ...listings];
    setListings(updatedListings);
    saveListings(updatedListings);
  };

  // Kustutab kuulutuse
  const deleteListing = (id) => {
    const updatedListings = listings.filter(l => l.id !== id);
    setListings(updatedListings);
    saveListings(updatedListings);
  };

  return (
    <ListingsContext.Provider value={{ listings, addListing, deleteListing }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => useContext(ListingsContext);
export default ListingsContext;
