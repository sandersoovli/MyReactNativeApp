// app/context/FavoritesContext.jsx
import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Hoiame massiivis ainult toodete ID-sid (stringid)
  const [favorites, setFavorites] = useState([]);

  /**
   * Kontrollib, kas antud ID on lemmikute massiivis.
   */
  const isFavorite = (productId) => favorites.includes(productId);

  /**
   * Lisab või eemaldab toote ID lemmikute massiivist.
   */
  const toggleFavorite = (productId) => { 
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      
      if (exists) {
        // Eemalda favoriit
        return prev.filter((id) => id !== productId);
      } else {
        // Lisa favoriit
        return [...prev, productId]; 
      }
    });
  };

  return (
    // Jaga kõik vajalikud väärtused rakendusega
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook Context'i tarbimiseks
export const useFavorites = () => useContext(FavoritesContext);