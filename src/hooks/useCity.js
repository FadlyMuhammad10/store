import { useCallback, useEffect, useState } from "react";
import { GetCity } from "../../services/participant";

const useCity = () => {
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showCity = useCallback(async () => {
    try {
      const result = await GetCity();
      setCity(result);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    showCity();
  }, []);

  return { city, loading, error };
};

export default useCity;
