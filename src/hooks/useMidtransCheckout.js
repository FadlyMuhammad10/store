import { useEffect, useState } from "react";
import { CheckoutProduct } from "../../services/participant";
import { toast } from "react-toastify";

export default function useMidtransCheckout() {
  const [isLoading, setIsLoading] = useState(false); // Loading state
  let isPayCalled = false; // Ensure snap.pay is called only once
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = `${process.env.NEXT_PUBLIC_API_CLIENT_KEY}`;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const checkoutCart = async (product_id, price, destination) => {
    if (isPayCalled) return;
    isPayCalled = true;
    setIsLoading(true);

    const data = {
      cart_item: product_id,
      price,
      origin: 249,
      destination: destination,
      weight: 100,
      courier: "jne",
    };

    try {
      const res = await CheckoutProduct(data);
      if (res?.token) {
        window.snap.pay(res.token, {
          onSuccess: function (result) {
            isPayCalled = false; // Reset flag after successful payment
            setIsLoading(false);
          },
          onError: function (error) {
            isPayCalled = false; // Reset flag on error
            setIsLoading(false);
          },
          onClose: function () {
            isPayCalled = false; // Reset flag when closed
            setIsLoading(false);
          },
        });
      } else {
        throw new Error("Failed to retrieve payment token");
      }
    } catch (error) {
      toast.error("Failed to checkout product.");
      console.error("Checkout error:", error);
      isPayCalled = false;
      setIsLoading(false);
      // Optional: Handle error or show a toast notification
    }
  };

  return { checkoutCart, isLoading };
}
