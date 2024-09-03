import { useCallback, useEffect, useState } from "react";
import { GetCarts } from "../../services/participant";

const useCarts = () => {
  const [carts, setCarts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showCarts = useCallback(async () => {
    try {
      const result = await GetCarts();
      setCarts(result);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    showCarts();
  }, []);

  return { carts, loading, error };
};

export default useCarts;
