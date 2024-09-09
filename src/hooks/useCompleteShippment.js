import { toast } from "react-toastify";
import { CompletedShipping } from "../../services/participant";

export default function useCompleteShippment() {
  const completed = async (id) => {
    const data = {
      status_shipment: "completed",
    };
    try {
      await CompletedShipping(id, data);
      toast.success("Success shipped, please refresh to see changes");
    } catch (error) {
      toast.error("Failed to Complete shipping.");
      console.error("Complete shipping error:", error);
    }
  };

  return { completed };
}
