import CallAPI from "@/configs/api";

export async function GetProducts() {
  const url = `/api/participant/products`;

  return CallAPI({ url, method: "GET" });
}
export async function GetProductDetail(id) {
  const url = `/api/participant/product/${id}`;

  return CallAPI({ url, method: "GET" });
}

export async function AddCart(data) {
  const url = `/api/participant/cart`;

  return CallAPI({ url, method: "POST", data, token: true });
}
export async function GetCarts() {
  const url = `/api/participant/carts`;

  return CallAPI({ url, method: "GET", token: true });
}
export async function DeleteCart(id) {
  const url = `/api/participant/cart/delete/${id}`;

  return CallAPI({ url, method: "DELETE", token: true });
}
export async function CheckoutProduct(data) {
  const url = `/api/participant/order/create`;

  return CallAPI({ url, method: "POST", data, token: true });
}
export async function OrderProducts() {
  const url = `/api/participant/orders`;

  return CallAPI({ url, method: "GET", token: true });
}
