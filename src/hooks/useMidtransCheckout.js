import { useEffect } from "react";
import { CheckoutProduct } from "../../services/participant";
import { toast } from "react-toastify";

export default function useMidtransCheckout() {
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

  const checkoutCart = async (product_id, price) => {
    const data = {
      cart_item: product_id,
      price,
    };

    try {
      const res = await CheckoutProduct(data);
      if (res?.token) {
        window.snap.pay(res.token);
      } else {
        throw new Error("Failed to retrieve payment token");
      }
    } catch (error) {
      toast.error("Failed to checkout product.");
      console.error("Checkout error:", error);
      // Optional: Handle error or show a toast notification
    }
  };

  return { checkoutCart };
}
