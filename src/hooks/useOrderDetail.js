import { useCallback, useEffect, useState } from "react";
import { OrderDetailProducts } from "../../services/participant";

const useOrderDetail = (id) => {
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showOrderDetail = useCallback(async () => {
    try {
      const result = await OrderDetailProducts(id);
      setOrder(result);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    showOrderDetail();
  }, []);

  return { order, loading, error };
};

export default useOrderDetail;
