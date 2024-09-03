import { useCallback, useEffect, useState } from "react";
import { GetProductDetail } from "../../services/participant";

const useProductDetail = (id) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    try {
      const result = await GetProductDetail(id);
      setProduct(result);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchProduct();
  }, []);

  return { product, loading, error };
};

export default useProductDetail;
