// FavoritesContext.jsx
import { createContext, useContext, useState } from 'react';

// Loome Context'i objekti
const FavoritesContext = createContext();

/**
 * See pakkuja (Provider) haldab lemmikute olekut ja funktsioone.
 * See peab olema nimega eksport, et vältida tsüklilisi impordivigu Expo Routeriga.
 */
export const FavoritesProvider = ({ children }) => {
  // Hoiame massiivis ainult toodete ID-sid (stringid)
  const [favorites, setFavorites] = useState([]);

  // Kontrollib, kas toode on lemmik
  const isFavorite = (productId) => favorites.includes(productId);

  // Lisab või eemaldab toote lemmikutest
  const toggleFavorite = (productId) => { 
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      
      if (exists) {
        // Eemalda
        return prev.filter((id) => id !== productId);
      } else {
        // Lisa
        return [...prev, productId]; 
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook Context'i mugavaks tarbimiseks
export const useFavorites = () => useContext(FavoritesContext);

export default FavoritesProvider;
