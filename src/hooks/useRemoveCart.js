import { toast } from "react-toastify";
import { DeleteCart } from "../../services/participant";

export default function useRemoveCart() {
  const removeCart = async (id) => {
    try {
      await DeleteCart(id);
      toast.success("Success remove cart, please refresh to see changes");
    } catch (error) {
      toast.error("Failed to remove item from cart.");
      console.error("Remove cart error:", error);
    }
  };

  return { removeCart };
}
