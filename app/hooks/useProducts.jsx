import { useEffect, useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();

      const apiProducts = data.map(p => ({
        id: p.id.toString(),
        name: p.title,
        price: p.price,
        image: p.image,       // FlatListis kasutame getImageSource
        description: p.description,
        category: p.category.toLowerCase(), // väga oluline filtrimiseks
      }));

      setProducts(apiProducts); // asendame olemasoleva massiivi
    } catch (err) {
      setError(err.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, fetchProducts };
}
