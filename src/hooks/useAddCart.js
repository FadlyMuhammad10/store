import { toast } from "react-toastify";
import { AddCart } from "../../services/participant";

export async function useAddCart(product) {
  const data = {
    product_id: product.id,
    quantity: 1,
  };

  try {
    await AddCart(data);
    toast.success(
      "Product added to cart successfully, you can check it in cart"
    );
  } catch (error) {
    toast.error("Failed to add product to cart.");
    console.error("Add to cart error:", error);
  }
}
