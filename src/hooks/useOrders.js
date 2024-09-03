import { useCallback, useEffect, useState } from "react";
import { OrderProducts } from "../../services/participant";

const useOrders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showOrders = useCallback(async () => {
    try {
      const result = await OrderProducts();
      setOrders(result);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    showOrders();
  }, []);

  return { orders, loading, error };
};

export default useOrders;
