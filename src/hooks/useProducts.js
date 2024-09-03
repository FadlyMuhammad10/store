import { useCallback, useEffect, useState } from "react";
import { GetProducts } from "../../services/participant";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const result = await GetProducts();
      setProducts(result);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
